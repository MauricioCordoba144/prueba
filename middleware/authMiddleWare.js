const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);
        if(!token){
            return res.status(403).send("Falta token");
        }
        try{ 
            jwt.verify(token, process.env.JWT_SECRET, (error, tokenDecodificado) => {
                if(error){
                    res.status(400).send("Acesso denegado");
                } else {
                    console.log(tokenDecodificado);
                    next();
                }
            })
        }catch(error){
            return res.status(401).send("Token invalido");
        }
        return next();

};

module.exports = {requireAuth}