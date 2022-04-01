import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/carsRepositoryInMemory";

import { ListAvailableCarUseCase } from "./listAvailableCarUseCase";

let listAvailableCarUseCase: ListAvailableCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarUseCase = new ListAvailableCarUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "Car Brand",
      category_id: "Category_id",
    });
    const cars = await listAvailableCarUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available car s by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name Test",
      description: "Car description test",
      daily_rate: 100,
      license_plate: "ABC-4321",
      fine_amount: 40,
      brand: "Car Brand Test",
      category_id: "Category_id",
    });
    const cars = await listAvailableCarUseCase.execute({
      brand: "Car Brand Test",
    });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available car s by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name 2",
      description: "Car description test 2",
      daily_rate: 100,
      license_plate: "DEF-123",
      fine_amount: 40,
      brand: "Car Brand Test",
      category_id: "Category_id",
    });
    const cars = await listAvailableCarUseCase.execute({ name: "Car Name 2" });
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available car s by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car Name 3",
      description: "Car description test 3",
      daily_rate: 100,
      license_plate: "DEF-321",
      fine_amount: 40,
      brand: "Car Brand Test",
      category_id: "123456",
    });
    const cars = await listAvailableCarUseCase.execute({
      category_id: "123456",
    });
    expect(cars).toEqual([car]);
  });
});
