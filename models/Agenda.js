const mongoose = require("mongoose");

const agendaSchema = new mongoose.Schema({
    
    fecha:{
        type: String,
        required: [true, "Se requiere la fecha"],
        index: true,
        lowercase: true,
    },

    userID:{
        type: String,
        required: [true, "Llena este espacio"],
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

});

const Agenda = mongoose.model("Agenda", agendaSchema);

module.exports = Agenda;