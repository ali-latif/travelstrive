import express from "express";
import {
  addTaxi,
  getTaxi,
  getSTaxiDetail,
} from "../controllers/taxiController.js";

const router = express.Router();

router.post("/addtaxi", addTaxi);
router.get("/gettaxi", getTaxi);
router.get("/taxi-booking/:id", getSTaxiDetail);

export default router;
