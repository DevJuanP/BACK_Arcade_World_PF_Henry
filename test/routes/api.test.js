const axios = require('axios');
const { User,Videogame } = require('../../src/db')


// Supongamos que tu servidor está en http://localhost:3000
const serverUrl = 'http://localhost:3001';

afterAll(async() => {
    await User.destroy({
        where: { nickname: 'NickUsuario' }
    })
    console.log('Todas las pruebas han finalizado.');
  });

    describe('Prueba de la ruta de card/punchased', () => {
      it('Debería responder con el objeto esperado si las credenciales son correctas', async () => {
        const games = await Videogame.findAll();
      const gamesID = games.map(game => game.id);
      const randomid = gamesID[Math.floor(Math.random() * gamesID.length)];
      
      const users = await User.findAll();
      const userID = users.map(  user=>user.id);
      const randomuserid = userID[Math.floor(Math.random() * userID.length)];
      
        const requestBody = {
          UserId: randomuserid,
          GamesIds: [randomid],
        };
        const response = await axios.post(
          `${serverUrl}/cart/purchased`,
          requestBody
        );
        // Verifica que la respuesta sea un objeto.
        expect(typeof response.data).toBe("object");

        // Verifica que el objeto tenga la propiedad 'session_url'.
        expect(response.data).toHaveProperty("session_url");

        // Verifica que 'session_url' sea una cadena (string).
        expect(typeof response.data.session_url).toBe("string");
      });
    });
    
    it('compra agregada a base de datos', async () => {
      const games = await Videogame.findAll();
      const gamesID = games.map(game => game.id);
      const randomid = gamesID[Math.floor(Math.random() * gamesID.length)];
      
      const users = await User.findAll();
      const userID = users.map(  user=>user.id);
      const randomuserid = userID[Math.floor(Math.random() * userID.length)];
      const requestBody = {
        UserId: randomuserid,
        GamesIds: [randomid],
        amount: 50,
      };
      const response = await axios.post(
        `${serverUrl}/cart/success`,
        requestBody
      );
      // Verifica que la respuesta sea un objeto.
      expect(typeof response.data).toBe("object");

      // Verifica que el objeto tenga la propiedad 'success'.
      expect(response.data).toHaveProperty("success");

      // Verifica que 'success' sea una cadena (string).
      expect(typeof response.data.success).toBe("string");
    });


 
  
  describe("probando las rutas de videojuegos",()=>{
    it('La respuesta de la API debe contener elementos en el array con 100 juegos', async () => {
      const response = await axios.get(`${serverUrl}/videogame`); // Reemplaza "tu-ruta-api" con la ruta real
      const data = response.data;
  
      expect(data).toBeInstanceOf(Array);
      expect(data.length).toBe(100);
    });
    it('La respuesta de la API debe traer los juegos por ID', async () => {
      const games = await Videogame.findAll();
      const gamesID = games.map(game => game.id);
      const randomid = gamesID[Math.floor(Math.random() * gamesID.length)];
      const response = await axios.get(`${serverUrl}/videogame/${randomid}`);
      const data = response.data;
  
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('name');
    });
  
    it('La respuesta de la API debe traer los juegos por nombre', async () => {
      const response = await axios.get(`${serverUrl}/videogame?name=dead`);
      const data = response.data;
  
      // Verifica que la respuesta sea un array.
      expect(Array.isArray(data)).toBe(true);
  
      // Verifica que la longitud del array sea 3.
      expect(data.length).toBe(4);
  
      // Verifica que cada objeto en el array tenga las propiedades "id" y "name".
      data.forEach((game) => {
        expect(game).toHaveProperty('id');
        expect(game).toHaveProperty('name');
      });
    });


  });

  describe("test de ruta de usuario",()=>{
    xit('Test ruta de usuarios', async () => {
      const response = await axios.get(`${serverUrl}/user`)
      const data = response.data;
      
  
      expect(data).toBeInstanceOf(Array);
      expect(data.length).toBeGreaterThan(49);
    });
    it('Test registro de usuario', async () => {
      const requestBody = {
          name: 'NombreUsuario',
          lastname: 'ApellidoUsuario',
          nickname: 'NickUsuario',
          password: '123asd3',
          Email: 'usuario@example.com',
        };
        
      const response = await axios.post(`${serverUrl}/user/register`, requestBody);
    
      expect(response.status).toBe(200);
      expect(response.data).toEqual({
      success: 'The user was successfully uploaded to the database, correo enviado',
      });
    });
    it('Test de login usuario', async () => {
      const requestBody = {
        nick_email: 'Destany72',
        password: '123asd',
      };
    
      const response = await axios.post(`${serverUrl}/user/login`, requestBody);
    
      expect(response.status).toBe(200);
      expect(response.data.login).toBe(true);
      expect(response.data.user).toHaveProperty('id');
      expect(response.data.user).toHaveProperty('name'); 
    });

    it('Test de update de usuario', async () => {
      const register = {
        name: 'NombreUsuario2',
        lastname: 'ApellidoUsuario2',
        nickname: 'NickUsuario2',
        password: '123asd3',
        Email: 'usuario2@example.com',
      };
      
    await axios.post(`${serverUrl}/user/register`, register);
      const user = await User.findOne({where:{nickname:"NickUsuario2"}}) 
      const requestBody = {
        id: user.id,
        image:"https://i.ibb.co/GsBDvzC/Imagen-de-un-usuario-no-logueado-con-luces-gamin-1.jpg",
        name: "Juanito",
        lastname: "Perez",
        email: "juanperez@gmail.com" ,
        nickname:"juanprogamer"
      }
      const response = await axios.put(`${serverUrl}/user/update`,requestBody)
      
      expect(response.data).toHaveProperty('success');
      expect(typeof response.data.success).toBe('string');
  });

  it('La respuesta de la API debe traer un usuario por ID', async () => {
    // Obtener la lista de usuarios
    const users = await User.findAll();
    
    // Generar un ID de usuario aleatorio
    const userIds = users.map(user => user.id);
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    
    // Realizar la solicitud GET para buscar al usuario por ID
    const response = await axios.get(`${serverUrl}/user/${randomUserId}`);
    const userData = response.data;
  
    // Verificar que la respuesta contiene las propiedades 'id' y 'name' (ajusta según tus necesidades)
    expect(userData).toHaveProperty('id');
    expect(userData).toHaveProperty('name');
    // Agrega más expectativas según las propiedades que esperes en la respuesta del usuario
  });
  



  });
