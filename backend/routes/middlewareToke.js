const jsonwebtoken = require("jsonwebtoken");

function isLogged(req, res, next) {
    const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null;
    if (!token) {
        return res.status(401).json({
            error: "Usuario no autorizado",
        });
    }

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.jwtInfo = decoded;

        // console.log(decoded);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            error: "Token no válido",
        });

        return;
    }
}

module.exports.isLogged = isLogged;