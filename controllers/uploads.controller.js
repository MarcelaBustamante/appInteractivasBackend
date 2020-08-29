const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const fs = require('fs');

const fileUpload = async (req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo válido'
        })
    }
    // Validar que exista un archivo.
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }
    // Procesar la imagen.
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const fileExtension = nombreCortado[nombreCortado.length - 1];
    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión válida'
        })
    }
    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${fileExtension}`;
    // Crear el path para guardar el archivo y moverlo
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el archivo'
            });
        }
        // Updatear la base de datos
        actualizarImagen(tipo, id, nombreArchivo);
        res.json({
            ok: true,
            msg: 'Archivo subido',
            fileName: nombreArchivo
        });
    });
}

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}`);
    // not found image
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    fileUpload,
    retornaImagen
}