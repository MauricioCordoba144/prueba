const mongoose = require("mongoose");
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    
    firstname:{
        type: String,
        required: [true, "Llena este espacio"],
        index: true,
        lowercase: true,
    },

    lastname:{
        type: String,
        required: [true, "Llena este espacio"],
        index: true,
        lowercase: true,
    },

    email:{
        type: String,
        required: [true, "Digita tu email"],
        unique: [true, "Este email ya se encuentra registrado"],
        index: true,
        lowercase: true,
        validate: [isEmail, "El email escrito no es valido"],
    },

    password:{
        type: String,
        required: [true, "Digita tu email"],
        minlength: [6,"La contraseña debe tener minimo 6caracteres"],
    },

});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function (email, password){
    const user = await User.findOne({email: email});
    if(user){
        const autorizado = await bcrypt.compare(password, user.password);
        if(autorizado){
            return user._id;
        } else {
            throw Error("Login: Contrasenia incorrecta.");
        }
    } else {
        throw Error("Login: Correo ingresado no existe.");
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;