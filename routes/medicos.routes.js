/**
* Archivo de rutas de medicos: la idea es agrupar todas las rutas
* relacionadas con una determinada entidad en archivos individuales.
*/

/*
    Endpoint: api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const {
    getMedicos,
    borrarMedico,
    actualizarMedico,
    crearMedico
} = require('../controllers/medicos.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',
    getMedicos
);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital es invalido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:medicoId',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital es invalido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

router.delete('/:medicoId',
    [

    ],
    borrarMedico
);

module.exports = router;