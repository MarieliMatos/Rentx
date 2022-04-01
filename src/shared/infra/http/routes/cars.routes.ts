import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/uploads";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailCarsController } from "@modules/cars/useCases/listAvailableCar/listAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/uploadCarImageController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticate";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCar = new ListAvailCarsController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/avatar"));

carsRoutes.post(
  "/",
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAuthenticate,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

carsRoutes.get("/available", listAvailableCar.handle);

export { carsRoutes };
