const axios = require('axios');
const { User } = require('../../src/db')

// Supongamos que tu servidor está en http://localhost:3000
const serverUrl = 'http://localhost:3001';

afterAll(async() => {
    await User.destroy({
        where: { nickname: 'NickUsuario3' }
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

  it('La respuesta de la API debe contener elementos en el array', async () => {
    const response = await axios.get(`${serverUrl}/user`); // Reemplaza "tu-ruta-api" con la ruta real
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
            name: 'NombreUsuario3',
            lastname: 'ApellidoUsuario3',
            nickname: 'NickUsuario3',
            password: '123asd3',
            Email: 'usuario3@example.com',
          };
          
        const response = await axios.post(`${serverUrl}/user/register`, requestBody);
      
        expect(response.status).toBe(200);
        expect(response.data).toEqual({
        success: 'The user was successfully uploaded to the database, correo enviado',
        });
      });
  });



