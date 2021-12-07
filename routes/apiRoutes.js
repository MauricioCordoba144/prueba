const {Router} = require("express");
const apiController = require("../controllers/apiController");

const router = Router();

router.post("/post-citas",apiController.funcCitas);

module.exports = router;