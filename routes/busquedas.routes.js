/*
    Endpoint: api/todo/
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getTodo,
    getDocumentosDeColeccion
} = require('../controllers/busquedas.controller');


const router = Router();

router.get('/:busqueda',
    [
        validarJWT
    ],
    getTodo
);

router.get('/coleccion/:tabla/:busqueda',
    [
        validarJWT
    ],
    getDocumentosDeColeccion
);


module.exports = router;