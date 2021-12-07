const Citas = require("../models/Citas");

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

