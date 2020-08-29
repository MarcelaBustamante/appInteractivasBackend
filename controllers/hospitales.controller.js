const { response } = require('express');
const Hospital = require('../models/hospital');
const hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');
    res.json({
        ok: true,
        hospitales: hospitales
    });
}

const crearHospital = async (req, res = response) => {
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    try {
        const hospitalEnMongo = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalEnMongo,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const actualizarHospital = async (req, res = response) => {
    const hospitalId = req.params.hospitalId;
    /*
    * Al pasar por el helper de validar el token
    * a todas las req se les añade el id del usuario
    * que realizó la petición
    */
    const uid = req.uid;
    try {
        const hospitalEnMongo = await Hospital.findById(hospitalId);
        if (!hospitalEnMongo) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            })
        } else {
            const cambiosEnHostpial = {
                ...req.body,
                usuario: uid
            }
            const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosEnHostpial, { new: true })
            res.json({
                ok: true,
                hospitalActualizado: hospitalActualizado,
            });
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarHospital = async (req, res = response) => {
    const hospitalId = req.params.hospitalId;
    console.log(hospitalId);
    try {
        const hospitalEnMongo = await Hospital.findById(hospitalId);
        if (!hospitalEnMongo) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado'
            })
        } else {
            await Hospital.findByIdAndDelete(hospitalId);
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
    getHospitales,
    borrarHospital,
    actualizarHospital,
    crearHospital
}