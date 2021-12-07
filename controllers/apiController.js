const Citas = require("../models/Citas");
const Agenda = require("../models/Agenda");

module.exports.funcCitas = async (req,res) => {
    console.log("postcitas");
    const { fecha, horainicial, horafinal, disponible } = req.body;
    try{
        const citas = await Citas.create({fecha, horainicial, horafinal, disponible});
        res.status(200).json({id: citas._id, fecha, horainicial, horafinal});
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
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

module.exports.agendacitas = async (req,res) => {
    console.log("agendacita");
    const { fecha, UserID, horainicial, horafinal} = req.body;
    try{
        const citas = await Citas.create({fecha, UserID, horainicial, horafinal});
        res.status(200).json({fecha, horainicial, horafinal});
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
