const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/cars", require("./cars"));
router.use("/rides", require("./rides"));
router.use("/drivers", require("./drivers"));
// router.use("/products", require("./products"));
// router.use("/lineItem", require("./lineItem"));
// router.use("/order", require("./order"));
// router.use("/review", require("./review"));
// router.use("/promocodes", require("./promocodes"));
// router.use("/paymentMethod", require("./paymentMethod"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
