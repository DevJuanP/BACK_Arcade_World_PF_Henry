const { User, Videogame, VG_user } = require('../db') 

const getAllUserHandler = async (req, res) => {
    try {
        const allUsers = await User.findAll({
            include: {
                model: Videogame,
            }
        })
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const postUserHandler = async (req, res) => {
    try {
        const {name, lastname, nickname, password, Email} = req.body
        if(!name || !lastname || !nickname || !password || !Email) return res.status(400).json({error: "missing data to be filled in"})

        const userNick = await User.findOne({
            where: { nickname: nickname}
        })
        if(userNick) return res.status(400).json({error: "nickname already exists, choose another one."})

        const userEmail = await User.findOne({
            where: { Email: Email}
        })
        if(userEmail) return res.status(400).json({error: "Email already exists, choose another one."})

        await User.create({name, lastname, nickname, password, Email})
        res.status(200).json({
            succses: 'The user was successfully uploaded to the database'
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
   
}

const loginUserHandler = async (req, res) => {
    try {
        const {nick_email, password} = req.body //{, Email}
        if(!password) return res.status(400).json({error: "password is missing"})
        if(!nick_email) return res.status(400).json({error: "nickname or Email is missing"})

        let user = await User.findAll({
            where: {
                password: password,
            }
        })

        user = user.filter( user => { return(user.nickname === nick_email || user.Email === nick_email)})[0] 

        res.status(200).json(user)

        

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const VG_userHandler = async (req, res) => {
    const {UserId, favorites} = req.body
    try {

        for(const GameId of favorites){
            const relation = await VG_user.findOne({ where: { 
                UserId: UserId,
                VideogameId: GameId
            } })
    
            if(relation){
                await VG_user.update({ favorites: true }, {
                    where: {
                        UserId: UserId,
                        VideogameId: GameId
                    }
                  });
            } else{
                await VG_user.create({
                    UserId: UserId,
                    VideogameId: GameId,
                    favorites: true,
                  });
            }
        }
        
        res.status(200).json({
            succses: 'add favorites'
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllUserHandler,
    postUserHandler,
    loginUserHandler,
    VG_userHandler
}