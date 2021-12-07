const {Router} = require("express");
const authController = require("../controllers/authController");

const router = Router();

router.post("/registro",authController.postRegistrar);
router.post("/iniciar-sesion",authController.postIniciarSesion);
router.get("/get-citas",authController.getCitas);
router.post("/cerrar-sesion",authController.postCerrarSesion);

router.get("/get-cita/:id",authController.getCita);

router.delete("/eliminar-citas/:id",authController.eliminarCitas);

module.exports = router;