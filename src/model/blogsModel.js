import mongoose from "mongoose";

export const GlamifyBlogsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  steps: {
    type: Array,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
});

export const GlamifyBlogs = mongoose.model("GlamifyBlogs", GlamifyBlogsSchema);
