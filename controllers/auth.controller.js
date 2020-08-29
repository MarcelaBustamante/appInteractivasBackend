const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
    const { password, email } = req.body;
    try {
        const usuarioEnMongoDB = await Usuario.findOne({ email });
        if (!usuarioEnMongoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email o contraseña inválido',
            });
        }
        // Email válido, chequear password.
        const validPassword = bcrypt.compareSync(password, usuarioEnMongoDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña inválida',
            });
        }
        // Email y contraseña valida, generar JWT.
        const token = await generarJWT(usuarioEnMongoDB.id);
        res.json({
            ok: true,
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

const googleSignIn = async (req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);
        // verificar si existe ese email registrado
        const usuarioEnMongoDB = await Usuario.findOne({ email });
        let usuario;
        if (!usuarioEnMongoDB) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: 'not necessary',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioEnMongoDB;
            usuario.google = true;
        }
        await usuario.save();
        // generar JWT
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            token: token
        });
    } catch (error) {
        res.status(401).json({
            ok: true,
            msg: 'Token invalido',
        });
    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;
    const newToken = await generarJWT(uid);
    res.json({
        ok: true,
        newToken: newToken
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}