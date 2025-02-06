import { GlamifyProducts } from "../model/productsModel.js";

export async function GetAllProducts(req, res) {
  try {
    let data = await GlamifyProducts.find();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

export async function GetOneProduct(req, res) {
  try {
    let data = await GlamifyProducts.findById(req.params.id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

export async function CreateProduct(req, res) {
  try {
    let data = await GlamifyProducts.create(req.body);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

export async function UpdateProduct(req, res) {
  try {
    let data = await GlamifyProducts.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

export async function DeleteProduct(req, res) {
  try {
    let data = await GlamifyProducts.findByIdAndDelete(req.params.id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}
