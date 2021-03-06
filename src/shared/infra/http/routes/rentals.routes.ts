import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/createRentalController";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticate, createRentalController.handle);

export { rentalRoutes };
