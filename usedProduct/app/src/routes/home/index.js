"use strict";
const express = require('express');
const router = express.Router();

const ctrl = require("./home.ctrl");



router.get("/product_register",ctrl.output.product_register);
router.get("/balance",ctrl.output.balance);
router.get("/get_deliverlist",ctrl.output.get_deliverlist);
//로그인 데이터를 받아옴

router.post("/product_register",ctrl.process.product_register);
router.post("/get_deliverlist",ctrl.process.get_deliverlist);
router.post("/save_deliverstate",ctrl.process.save_deliverstate);
router.post("/balance",ctrl.process.balance);
router.post("/update_state",ctrl.process.update_state);
router.post("/update_deliverstate",ctrl.process.update_deliverstate);


module.exports = router;



