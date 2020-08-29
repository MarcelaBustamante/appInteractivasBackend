/**
* Archivo de rutas de usuarios: la idea es agrupar todas las rutas
* relacionadas con una determinada entidad (en este caso usuarios)
* en archivos individuales.
*/

/*
    Endpoint: api/usuarios
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { 
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
} = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',
    [
        validarJWT
    ],
    getUsuarios
);

router.post('/',
    [
        check('nombre', 'nombre es obligatorio').not().isEmpty(),
        check('password', 'password es obligatorio').not().isEmpty(),
        check('email', 'email es obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuario
);

router.put('/:id',
    [
        validarJWT,
        check('nombre', 'nombre es obligatorio').not().isEmpty(),
        check('email', 'email es obligatorio').isEmail(),
        check('role', 'role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario
);

router.delete('/:id',
    [
        validarJWT
    ],
    borrarUsuario
);

module.exports = router;