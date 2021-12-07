const mongoose = require("mongoose");

const citasSchema = new mongoose.Schema({
    
    fecha:{
        type: String,
        required: [true, "Se requiere la fecha"],
        index: true,
        lowercase: true,
    },

    horainicial: {
        type: String,
        required: [true, "Se requiere la hora inicial"],
        lowercase: true,
    },

    horafinal:{
        type: String,
        required: [true, "Se requiere la hora final"],
        lowercase: true,
    },

    disponible:{
        type: String,
        required: [true,"¿Disponible?"],
        uppercase: true,
    },

});

const Citas = mongoose.model("Citas", citasSchema);

module.exports = Citas;