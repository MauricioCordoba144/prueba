const {Router} = require("express");
const apiController = require("../controllers/apiController");

const router = Router();

router.post("/post-citas",apiController.funcCitas);
router.delete("/eliminar-citas/:id",apiController.eliminarCitas);
router.get("/get-cita/:id",apiController.getCita);
router.get("/get-citas",apiController.getCitas);
router.post("/agenda-citas",apiController)

module.exports = router;