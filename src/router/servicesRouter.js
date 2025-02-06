import express from "express";

import {
  CreateService,
  DeleteService,
  GetAllServices,
  GetOneService,
  UpdateService,
} from "../conrollers/servicesControllers.js";
export const ServicesRouter = express.Router();
ServicesRouter.get("/", GetAllServices);
ServicesRouter.get("/:id", GetOneService);

ServicesRouter.post("/", CreateService);

ServicesRouter.put("/:id", UpdateService);

ServicesRouter.delete("/:id", DeleteService);
