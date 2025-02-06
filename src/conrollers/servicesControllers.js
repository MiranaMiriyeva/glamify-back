import { GlamifyServices } from "../model/servicesModel.js";

export async function GetAllServices(req, res) {
  try {
    let data = await GlamifyServices.find();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

export async function GetOneService(req, res) {
  try {
    let data = await GlamifyServices.findById(req.params.id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

export async function CreateService(req, res) {
  try {
    let data = await GlamifyServices.create(req.body);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

export async function UpdateService(req, res) {
  try {
    let data = await GlamifyServices.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

export async function DeleteService(req, res) {
  try {
    let data = await GlamifyServices.findByIdAndDelete(req.params.id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}
