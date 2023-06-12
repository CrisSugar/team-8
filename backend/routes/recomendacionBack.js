const cors = require('cors');
const sequelize = require('../conexion-base-datos');
const express = require('express');

const getRecomendacion = async (req, res) => {
    const user_id = req.params.user_id;
    // const user_id = req.jwtInfo.userId;
    try {
        const recomendacionData = await sequelize.query(
            // 'SELECT * FROM recomendaciones WHERE usuario_receptor_ID = :id',
            // 'SELECT r.*, u.name AS nombre_usuario_emisor FROM recomendaciones r JOIN users u ON r.usuario_emisor_ID = u.user_id WHERE r.usuario_receptor_ID = :id',
            `SELECT
            u.name,
            r.recomendacion_ID,
            r.usuario_emisor_ID,
            r.usuario_receptor_ID,
            r.contenido
        FROM
            recomendaciones AS r
        INNER JOIN
            users AS u
        ON
            r.usuario_emisor_ID = u.user_id
        WHERE
            r.usuario_receptor_ID = :id`,
            {
                replacements: { id: user_id },
                type: sequelize.QueryTypes.SELECT,
            }
        );
        console.log("AHHHHHHHHHHHHHHHHHHHHHHH" + recomendacionData);
        if (!recomendacionData) {
            return res.status(404).json({ message: 'Usuario sin recomendaciones' });
        } else {
            res.status(200).json(recomendacionData);
            console.log("Holaaaaaaaaaaaaa" + recomendacionData);
        }
    } catch (err) {
        return res
            .status(500)
            .json({ msg: `Error obteniendo recomendaciones del usuario: ${err.message}` });
    }
};

// const updateRecomendacion = async (req, res) => {
//     const { recomendacion_id, contenido } = req.body;

//     try {
//         // Actualiza la recomendación en la BBDD//
//         const resultado = await sequelize.query(
//             'UPDATE recomendaciones SET contenido = :contenido WHERE recomendacion_id = :recomendacion_id',
//             {
//                 replacements: { contenido, recomendacion_id },
//                 type: sequelize.QueryTypes.UPDATE,
//             }
//         );

//         const numFilasActualizadas = resultado[1];

//         if (numFilasActualizadas === 0) {
//             return res.status(404).json({ message: 'Recomendación no encontrada' });
//         }

//         // Devuelve mensaje de éxito en la respuesta//
//         res.status(200).json({ message: 'Recomendación actualizada exitosamente' });
//     } catch (err) {
//         return res
//             .status(500)
//             .json({ msg: `Error al actualizar la recomendación: ${err.message}` });
//     }
// };

const updateRecomendacion = async (req, res) => {
    const { contenido, usuario_emisor_ID, usuario_receptor_ID } = req.body;

    try {
        // Inserta la nueva recomendación en la BBDD junto con los IDs del emisor y receptor
        const resultado = await sequelize.query(
            'INSERT INTO recomendaciones (contenido, usuario_emisor_ID, usuario_receptor_ID) VALUES (:contenido, :usuario_emisor_ID, :usuario_receptor_ID)',
            {
                replacements: { contenido, usuario_emisor_ID, usuario_receptor_ID },
                type: sequelize.QueryTypes.INSERT,
            }
        );

        // Obtén el ID de la recomendación recién creada
        const recomendacionId = resultado[0];

        // Devuelve mensaje de éxito en la respuesta con el ID de la nueva recomendación
        res.status(200).json({ message: 'Recomendación creada exitosamente', recomendacionId });
    } catch (err) {
        return res
            .status(500)
            .json({ msg: `Error al crear la recomendación: ${err.message}` });
    }
};


module.exports.getRecomendacion = getRecomendacion;
module.exports.updateRecomendacion = updateRecomendacion;