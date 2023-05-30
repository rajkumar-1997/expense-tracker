const express = require("express");

const orderController = require("../controllers/order");
const middlewareController = require("../middlewares/auth");

const router = express.Router();

router.get(
  "/create-OrderId",
  middlewareController.authenticate,
  orderController.purchasepremium 
);

router.post(
  "/verify",
  middlewareController.authenticate,
  orderController.updateTransaction 
);

module.exports = router;