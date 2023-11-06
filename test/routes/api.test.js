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

// Prueba de la ruta que quieres probar
describe('Pruebas de la API del servidor', () => {
  it('La respuesta de la API debe contener elementos en el array con 100 juegos', async () => {
    const response = await axios.get(`${serverUrl}/videogame`); // Reemplaza "tu-ruta-api" con la ruta real
    const data = response.data;

    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBe(100);
  });

  xit('La respuesta de la API debe contener elementos en el array', async () => {
    const response = await axios.get(`${serverUrl}/user`)
    const data = response.data;
    

    expect(data).toBeInstanceOf(Array);
    expect(data.length).toBeGreaterThan(49);
  });
});

describe('Prueba de la ruta de inicio de sesión', () => {
    it('Debería responder con el objeto esperado si las credenciales son correctas', async () => {
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
  });

  describe('Prueba de la ruta de inicio de registro', () => {
    it('Debería responder con el objeto esperado si las credenciales son correctas', async () => {
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
  });



  describe('Pruebas de la API del servidor para videogames', () => {
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

    describe('Prueba de la ruta de card/punchased', () => {
      it('Debería responder con el objeto esperado si las credenciales son correctas', async () => {
        const requestBody = {
          UserId: "093d858f-d7c8-4704-b322-f2cda0ea9b3f",
          GamesIds: ["00488a04-b7ca-411c-beb8-416b7f15b096"],
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
      const requestBody = {
        UserId: "093d858f-d7c8-4704-b322-f2cda0ea9b3f",
        GamesIds: ["00488a04-b7ca-411c-beb8-416b7f15b096"],
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
  });
  
  