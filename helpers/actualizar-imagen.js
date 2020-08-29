const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // Eliminar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let oldPath = '';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }
            oldPath = `./uploads/medicos/${medico.img}`;
            borrarImagen(oldPath);
            medico.img = nombreArchivo;
            await medico.save();
            return true;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }
            oldPath = `./uploads/medicos/${hospital.img}`;
            borrarImagen(oldPath);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }
            oldPath = `./uploads/medicos/${usuario.img}`;
            borrarImagen(oldPath);
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
    }
}


module.exports = {
    actualizarImagen
}