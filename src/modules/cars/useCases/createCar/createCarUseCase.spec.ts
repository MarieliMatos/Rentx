import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/carsRepositoryInMemory";
import { AppError } from "@shared/errors/appError";

import { CreateCarUseCase } from "./createCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car ", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists licence plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car1",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "Category",
      });

      await createCarUseCase.execute({
        name: "Car2",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "Category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with with available true as default", () => {
    expect(async () => {
      const car = await createCarUseCase.execute({
        name: "Car",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABCD-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "Category",
      });

      expect(car.available).toBe(true);
    });
  });
});
