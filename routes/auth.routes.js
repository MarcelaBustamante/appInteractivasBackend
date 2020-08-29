/**
* Archivo de rutas de autenticación: la idea es agrupar todas las rutas
* relacionadas con una determinada entidad o funcionalidad (en este caso la autenticación)
* en archivos individuales.
*/

/*
* Endpoint: api/login
*/

const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/',
    [
        check('password', 'password es obligatorio').not().isEmpty(),
        check('email', 'email es obligatorio').isEmail(),
        validarCampos
    ],
    login
)

router.post('/google',
    [
        check('token', 'Google token es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn
)

router.get('/renew',
    validarJWT,
    renewToken
)


module.exports = router;