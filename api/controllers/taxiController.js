import Taxi from "../models/Taxi.js";

export const addTaxi = async (req, res, next) => {
  try {
    const newtaxi = new Taxi({
      carModel: req.body.carModel,
      price: req.body.price,
      maxPeople: req.body.maxPeople,
      licenseNum: req.body.licenseNum,
      imageUrl: req.body.imageUrl,
    });
    await newtaxi.save();
    res.status(200).json(newtaxi);
  } catch (error) {}
};

export const getTaxi = async (req, res) => {
  try {
    const taxiList = await Taxi.find();
    res.status(200).json(taxiList);
  } catch (error) {
    console.log("Cannot get Taxi List", error);
  }
};

export const getSTaxiDetail = async (req, res, next) => {
  try {
    const taxi = await Taxi.findOne({ _id: req.params.id });
    console.log(taxi);
    res.status(200).json(taxi);
  } catch (err) {
    next(err);
  }
};
