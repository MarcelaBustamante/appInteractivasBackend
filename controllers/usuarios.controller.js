/**
* Archivo controlador: la idea es agrupar todas las funciones que
* van a realizar cada endpoint relacionadas con una determinada entidad (en este caso usuarios)
* en archivos individuales.
* https://mongoosejs.com/docs/queries.html
*/

const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email })
        if (existeEmail) {
            return res.status(409).json({
                ok: false,
                msg: 'Ya está registrado',
            });
        }
        const usuario = new Usuario(req.body);
        // Encriptar constraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        // Guardar en MongoDB
        await usuario.save();
        // Generar JWT
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario: usuario,
            token: token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        })
    }
}

const getUsuarios = async (req, res) => {
    const desde = Number(req.query.desde) || 0;
    const [usuarios, totalUsuarios] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),
        Usuario.countDocuments()
    ])
    res.json({
        ok: true,
        usuarios: usuarios,
        total: totalUsuarios
    });
}

const actualizarUsuario = async (req, res) => {
    const uid = req.params.id;
    try {
        const usuarioEnMongoDB = Usuario.findById(uid);
        if (!usuarioEnMongoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe',
            });
        }
        //UPDATES
        const { password, google, email, ...campos } = req.body;
        // Si se desea actualizar el emai, se debe chequear que el email
        // nuevo no esté registrado ya en la base.
        if (usuarioEnMongoDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email: email });
            if (existeEmail) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email',
                });
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
}

const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioEnMongoDB = Usuario.findById(uid);
        if (!usuarioEnMongoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe',
            });
        }
        await Usuario.findByIdAndDelete(uid);
        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado',
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}