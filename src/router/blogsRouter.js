import express from "express";
import {
  CreateBlog,
  DeleteBlog,
  GetAllBlogs,
  GetOneBlog,
  UpdateBlog,
} from "../conrollers/blogsControllers.js";

export const BlogsRouter = express.Router();
BlogsRouter.get("/", GetAllBlogs);
BlogsRouter.get("/:id", GetOneBlog);

BlogsRouter.post("/", CreateBlog);

BlogsRouter.put("/:id", UpdateBlog);

BlogsRouter.delete("/:id", DeleteBlog);
