const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    const usuarios = await Usuario.find({ nombre: regex });
    const hospitales = await Hospital.find({ nombre: regex });
    const medicos = await Medico.find({ nombre: regex });

    res.json({
        ok: true,
        busqueda: busqueda,
        usuarios: usuarios,
        hospitales: hospitales,
        medicos: medicos
    });
}

const getDocumentosDeColeccion = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    let data = [];
    if (tabla == 'medicos') {
        data = await Medico.find({ nombre: regex })
                            .populate('usuario', 'nombre img')
                            .populate('hospital', 'nombre img');
    } else if (tabla == 'usuarios') {
        data = await Usuario.find({ nombre: regex });
    } else if (tabla == 'hospitales') {
        data = await Hospital.find({ nombre: regex })
                            .populate('usuario', 'nombre img');     
    } else {
        return res.status(400).json({
            ok: false,
            msg: 'No existe esa tabla'
        });
    }
    res.json({
        ok: true,
        data: data
    });
}

module.exports = {
    getTodo,
    getDocumentosDeColeccion
}