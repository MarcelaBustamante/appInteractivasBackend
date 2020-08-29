const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')
    res.json({
        ok: true,
        medicos: medicos
    });
}

const crearMedico = async (req, res = response) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    try {
        const medicoEnMongo = await medico.save();
        res.json({
            ok: true,
            medico: medicoEnMongo,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const actualizarMedico = async (req, res = response) => {
    const medicoId = req.params.medicoId;
    /*
    * Al pasar por el helper de validar el token
    * a todas las req se les añade el id del usuario
    * que realizó la petición
    */
    const uid = req.uid;
    try {
        const medicoEnMongo = await Medico.findById(medicoId);
        if (!medicoEnMongo) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado'
            })
        } else {
            const cambiosEnMedico = {
                ...req.body,
                usuario: uid
            }
            const medicoActualizado = await Medico.findByIdAndUpdate(hospitalId, cambiosEnMedico, { new: true })
            res.json({
                ok: true,
                medicoActualizado: medicoActualizado,
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarMedico = async (req, res = response) => {
    const medicoId = req.params.medicoId;
    try {
        const medicoEnMongo = await Medico.findById(medicoId);
        if (!medicoEnMongo) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            })
        } else {
            await Medico.findByIdAndDelete(medicoId);
            res.json({
                ok: true,
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getMedicos,
    borrarMedico,
    actualizarMedico,
    crearMedico
}