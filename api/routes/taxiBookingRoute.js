import express from "express";
import {
  addTaxiBooking,
  getTaxiBooking,
} from "../controllers/taxiBookingController.js";

const router = express.Router();

router.post("/addtaxi-booking", addTaxiBooking);
router.get("/gettaxi-booking", getTaxiBooking);

export default router;
