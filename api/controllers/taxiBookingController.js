import TaxiBooking from "../models/TaxiBooking.js";
import Taxi from "../models/Taxi.js";

export const addTaxiBooking = async (req, res, next) => {
  try {
    const newtaxiBooking = new TaxiBooking({
      userId: req.body.userId,
      taxiId: req.body.taxiId,
      totalPrice: req.body.totalPrice,
      bookedFrom: req.body.bookedFrom,
      bookedTill: req.body.bookedTill,
    });
    await newtaxiBooking.save();
    res.status(200).json(newtaxiBooking);
  } catch (error) {}
};

export const getTaxiBooking = async (req, res) => {
  try {
    const taxiBookingList = await TaxiBooking.find();
    res.status(200).json(taxiBookingList);
  } catch (error) {
    console.log("Cannot get Taxi Booking List", error);
  }
};
