import { GlamifyBlogs } from "../model/blogsModel.js";

export async function GetAllBlogs(req, res) {
  try {
    let data = await GlamifyBlogs.find();
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

export async function GetOneBlog(req, res) {
  try {
    let data = await GlamifyBlogs.findById(req.params.id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

export async function CreateBlog(req, res) {
  try {
    let data = await GlamifyBlogs.create(req.body);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

export async function UpdateBlog(req, res) {
  try {
    let data = await GlamifyBlogs.findByIdAndUpdate(req.params.id, req.body);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

export async function DeleteBlog(req, res) {
  try {
    let data = await GlamifyBlogs.findByIdAndDelete(req.params.id);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}
