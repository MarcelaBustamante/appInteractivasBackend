/**
* Archivo de rutas de hospitales: la idea es agrupar todas las rutas
* relacionadas con una determinada entidad en archivos individuales.
*/

/*
    Endpoint: api/hospitales
*/

const { Router } = require('express');
const { check } = require('express-validator');
const {
    getHospitales,
    borrarHospital,
    actualizarHospital,
    crearHospital
} = require('../controllers/hospitales.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',
    getHospitales
);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

router.put('/:hospitalId',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital
);

router.delete('/:hospitalId',
    [

    ],
    borrarHospital
);

module.exports = router;