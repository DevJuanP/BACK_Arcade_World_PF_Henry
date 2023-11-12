const getAllUsers = require('../Controlers/UserControllers/getAllUsers')
const getUsersByName = require('../Controlers/UserControllers/getUsersByName')
const { User, Videogame, Purchase, Cart } = require('../db')
const findUser = require('../Controlers/UserControllers/findUser')
const loginformaterUser = require('../Controlers/UserControllers/loginformaterUser')
const loadFavorites = require('../Controlers/UserControllers/loadFavorites')
const loadReviews = require('../Controlers/UserControllers/loadReviews')
const loadPurchased = require('../Controlers/UserControllers/loadPurchased')
const loadStars = require('../Controlers/UserControllers/loadStars')
const wipeUnsedRelations = require('../Controlers/UserControllers/wipeUnsedRelations')
const { hash, compare } = require('../utils/hash')
const {correoDeBienvenida} = require('../utils/nodemailer')
const { Op } = require('sequelize')
const profileGenerator = require('../utils/profileGenerator')
const objectFilter = require('../utils/objectFilter')
const { validate } = require('uuid')
//firebase:
const admin = require('firebase-admin')
const { initializeApp, cert } = require('firebase-admin/app');
const serviceAccount = require('../../firebase/arcadeworld-507c9-firebase-adminsdk-llem5-661bf18c05.json');
initializeApp({
  credential: cert(serviceAccount)
});
//fin de firebase

const getUsersHandler = async (req, res) => {
  const name = null;
  try {
    if (name) {
      const users = await getUsersByName(name);
      return res.status(200).json(users);
    }
    const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getuserById = async (req, res) => {
  const {id} = req.params
  try {
    if(!validate(id)) {
      const user = await User.findOne({
        where: { uid: id },
        include: [
            {
                model: Videogame,
            },
            {
                model: Purchase,
                include: {
                    model: Videogame,
                    attributes: ['id','name', 'image']
                }
            },
            {
                model: Cart,
                include: {
                    model: Videogame,
                    attributes: ['id','name', 'image', 'price', ]
                }
            }
        ]
      })
      
      if(!user) return res.json({error: "ni buscando por uid existe el usuario (¬‿¬)"})
      const parseUser = loginformaterUser(user)
      return res.status(200).json(parseUser)
    }

    const user = await User.findByPk(id, {
      include: [
        {
            model: Videogame,
        },
        {
            model: Purchase,
            include: {
                model: Videogame,
                attributes: ['id','name', 'image']
            }
        },
        {
            model: Cart,
            include: {
                model: Videogame,
                attributes: ['id','name', 'image', 'price', ]
            }
        }
      ]
    })
    
    if(!user) return res.json({error: "si es uuid, pero no hay usuario con ese id (¬‿¬)"})
    const parseUser = loginformaterUser(user)
    res.status(200).json(parseUser)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const userRegisterHandler = async (req, res) => {
  try {
    let { name, lastname, nickname, password, Email, image } = req.body;

    if (!name || !lastname || !nickname || !password || !Email) return res.status(200).json({ error: "missing data to be filled in" });

    const userNick = await User.findOne({
      where: { nickname: nickname }
    });
    if (userNick) return res.status(200).json({ error: "nickname already exists, choose another one." });

    const userEmail = await User.findOne({
        where: { Email: Email}
    })
    if(userEmail) return res.status(200).json({error: "Email already exists, choose another one."})
    
    if(image === '') image = 'https://i.ibb.co/GsBDvzC/Imagen-de-un-usuario-no-logueado-con-luces-gamin-1.jpg'

    password = await hash(password)

    await User.create({name, lastname, nickname, password, Email, image})
    const wasSend = await correoDeBienvenida(Email);
    res.status(200).json({
      success: `The user was successfully uploaded to the database, correo ${wasSend? 'enviado': 'no enviado'}`
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUserHandler = async (req, res) => {
  try {
    const dataToUpdate = await objectFilter(req.body)//se queda con lo necesario y hashea el password
    const {id, uid} = dataToUpdate
    if(id && uid) return res.json({error: 'conflicto entre id y uid'})
    if(id){
      const user = await User.findByPk(id)
      if(!user) return res.json({error: 'usuario no encontrado'})
      const response = await User.update(dataToUpdate, {
        where: {id}
      })
      const updateUser = await User.findByPk(id, {
        include: [
          {
              model: Videogame,
          },
          {
              model: Purchase,
              include: {
                  model: Videogame,
                  attributes: ['id','name', 'image']
              }
          },
          {
              model: Cart,
              include: {
                  model: Videogame,
                  attributes: ['id','name', 'image', 'price', ]
              }
          }
        ]
      })
      const parseUser = loginformaterUser(updateUser)
      return res.status(200).json(parseUser)
    }
    if(uid){
      const G_user = await User.findOne({where: {uid}})
      if(!G_user) return res.json({error: 'usuario no encontrado'})
      const response = await User.update(dataToUpdate, {
        where: {uid}
      })
      const updateUser = await User.findOne({where:{uid}}, {
        include: [
          {
              model: Videogame,
          },
          {
              model: Purchase,
              include: {
                  model: Videogame,
                  attributes: ['id','name', 'image']
              }
          },
          {
              model: Cart,
              include: {
                  model: Videogame,
                  attributes: ['id','name', 'image', 'price', ]
              }
          }
        ]
      })
      const parseUser = loginformaterUser(updateUser)
      return res.status(200).json(parseUser)
    }
    res.json({error: {message: 'id or uid is missing'}})
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const loginUserHandler = async (req, res) => {
  try {
    const { nick_email, password } = req.body;
    if (!password) return res.status(200).json({
      login: false,
      error: { message: 'password is missing.' }
    });
    if (!nick_email) return res.status(200).json({
      login: false,
      error: { message: 'nickname or Email is missing.' }
    });

    const user = await User.findOne({
      where: {
        [Op.or]: [
          {Email: nick_email},
          {nickname: nick_email}
        ]
      },
      include: [
          {
              model: Videogame,
          },
          {
              model: Purchase,
              include: {
                  model: Videogame,
                  attributes: ['id','name', 'image']
              }
          },
          {
              model: Cart,
              include: {
                  model: Videogame,
                  attributes: ['id','name', 'image', 'price', ]
              }
          }
      ]
    })
    
    if(!user) return res.status(200).json({
        login: false,
        error: {message: 'User not found. Password, Nickname or Email incorrect.'}
      })

    const isAutenticated = await compare(password, user.password)

    if(isAutenticated){
      const newLoginCount = user.logincount + 1
      await User.update({logincount: newLoginCount},{
        where: {id: user.id}
      })
      const userParsed = loginformaterUser(user)
      res.status(200).json({
        login: true,
        user: userParsed
      })
    }else{
      res.status(200).json({
        login: false,
        error: {message: 'Incorrect password.'}
      })
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const VG_userHandler = async (req, res) => {
  const { UserId, favorites, reviews, purchased, graphics, gameplay, quality_price } = req.body;
  try {

    await loadFavorites(UserId, favorites);
    await loadReviews(UserId, reviews);
    await loadPurchased(UserId, purchased);
    await loadStars(UserId, graphics, gameplay, quality_price);

    await wipeUnsedRelations();
    res.status(200).json({ success: 'Successful update of the relationship between users and video games' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const firebaseHandler = async (req, res) => {
  try {
    const { token } = req.body
    if(!token || token === ''){
      return res.json({login: false, error: 'token is missing'})
    }
    const decodeValue = await admin.auth().verifyIdToken(token)
    const { uid } = decodeValue

    const user = await User.findOne({
      where: { uid },
      include: [
          {
              model: Videogame,
          },
          {
              model: Purchase,
              include: {
                  model: Videogame,
                  attributes: ['id','name', 'image']
              }
          },
          {
              model: Cart,
              include: {
                  model: Videogame,
                  attributes: ['id','name', 'image', 'price', ]
              }
          }
      ]
    })

    if(!user) {
      //regitra al usuario y lo devuelve
      const {name, lastname, nickname, Email, image, uid} = await profileGenerator(decodeValue)
      await User.create({name, lastname, nickname, Email, image, uid})
      const newuser = await User.findOne({
        where: { uid },
        include: [
            {
                model: Videogame,
            },
            {
                model: Purchase,
                include: {
                    model: Videogame,
                    attributes: ['id','name', 'image']
                }
            },
            {
                model: Cart,
                include: {
                    model: Videogame,
                    attributes: ['id','name', 'image', 'price', ]
                }
            }
        ]
      })
      const newUserParsed = loginformaterUser(newuser)
      return res.status(200).json({
        login: true,
        user: newUserParsed
      })
    }
    const userParsed = loginformaterUser(user)
    res.status(200).json({
      login: true,
      user: userParsed
    })

  } catch (error) {
    res.json({
      login: false,
      error: error.message || { message: 'Invalid token.' }
    });
  }
}

module.exports = {
  getUsersHandler,
  userRegisterHandler,
  loginUserHandler,
  VG_userHandler,
  updateUserHandler,
  firebaseHandler,
  getuserById
};
