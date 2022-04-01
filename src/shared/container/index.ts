import "reflect-metadata";
import { container } from "tsyringe";

import "@shared/container/providers";

import { UserRepository } from "@modules/account/infra/typeorm/repositories/UsersRpository";
import { IUserRepository } from "@modules/account/repositories/IUsersRepository";
import { CarImageRepository } from "@modules/cars/infra/typeorm/repositories/carImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/categoriesRepositories";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/specificationsRepository";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImageRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/IspecificationsRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/rentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarImagesRepository>(
  "CarImageRepository",
  CarImageRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalRepository",
  RentalsRepository
);
