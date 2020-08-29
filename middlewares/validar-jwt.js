const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    // Leer el token
    const token = req.header('x-token');
    console.log(token);
    // Verificar si se envió el token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token provided'
        });
    }
    // Verificar si el token es valido
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        /*
        * Los middlewares permiten añadir información a la req,
        * la cual puede ser recuperada por el metodo siguiente.
        * En este caso, si el token es valido, agregamos el uid
        * del usuario logueado.
        */
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Unauthorized, invalid token'
        });
    }
}

module.exports = {
    validarJWT
}