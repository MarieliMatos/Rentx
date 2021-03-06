import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalRoutes } from "./rentals.routes";
import { specificationRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/cars", carsRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", usersRoutes);
router.use("/rentals", rentalRoutes);
router.use(authenticateRoutes);

export { router };
