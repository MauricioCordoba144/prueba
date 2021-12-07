const User = require("../models/User");
const Citas = require("../models/Citas");
const jwt = require("jsonwebtoken");

const manejoErrorEmail = (error) => {
    let errors = {email: "", password: ""};

    //Email incorrecto
    if(error.message === "Login: Contrasenia incorrecta."){
        errors.email = "Email y/o contrasenia incorrectos";
        errors.password = "Email y/o contrasenia incorrectos";
    }

    //Email no existe
    if(error.message === "Login: Correo ingresado no existe."){
        errors.email = "Email y/o contrasenia incorrectos";
        errors.password = "Email y/o contrasenia incorrectos";
    }

    //Email existe
    if(error.message === 11000){
        errors.email = "El email ya se encuentra registrado";
    }

    if(error.message.includes("User validation failed:")){
        Object.values(error.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
};
 
const maxAge = 24*60*60;

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: maxAge});
};


module.exports.postRegistrar = async (req,res) => {
    console.log("PostRegistrar");
    const { firstname, lastname, email, password } = req.body;
    try{
        const user = await User.create({firstname, lastname, email, password});
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly:true, maxAge: maxAge*1000});
        res.status(200).json({ email })
    } catch (error) {
        const errors = manejoErrorEmail(error);
        res.status(400).json(errors);
    }
};

module.exports.postIniciarSesion = async (req,res) => {
    console.log("IniciarSesion");
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly:true, maxAge: maxAge*1000});
        res.status(200).json({ id: user._id, email})
    } catch (error) {
        const errors = manejoError(error);
        res.status(400).json(errors);
    }
};

module.exports.postCerrarSesion = async (req,res) => {
    console.log("CerrarSesion");
    res.cookie("jwt", "", { maxAge:1});
    res.send("postCerrarSesion");
};

module.exports.getCitas = async (req,res) => {
    console.log("getcitas");
    try{
        const listacitas = await Citas.find();
        res.status(200).json(listacitas);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

module.exports.getCita = async (req,res) => {
    console.log("getcita");
    const _id = req.params.id;
    try{
        const listacitas = await Citas.find({"_id": _id});
        res.status(200).json(listacitas);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};


module.exports.eliminarCitas = async (req,res) => {
    console.log("eliminar citas");
    const _id = req.params.id;
    console.log(_id);   
    try{
        const citasactuales = await Citas.findByIdAndDelete({_id});
        if(!citasactuales){
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado',
                error
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Ocurrio un error",
            error
        });
    }
};

