const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            console.log('Token recibido:', token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log('Token decodificado:', decoded);

            // Puedes asignar directamente el objeto decodificado al req.usuario
            req.usuario = decoded;

            return next();
        } catch (error) {
            console.error('Error en la verificación del token:', error);
            return res.status(404).json({ status: 404, error: 'Hubo un error en la verificación del token' });
        }
    }

    if (!token) {
        const error = new Error('Token no válido');
        return res.status(401).json({ status: 401, error: error.message });
    }

    next();
};

module.exports = { verifyToken };
