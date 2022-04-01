import { getRepository, Repository } from "typeorm";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImageRepository";

import { CarImages } from "../entities/carImages";

class CarImageRepository implements ICarImagesRepository {
  private repository: Repository<CarImages>;
  constructor() {
    this.repository = getRepository(CarImages);
  }

  async create(car_id: string, image_name: string): Promise<CarImages> {
    const carImage = this.repository.create({ car_id, image_name });
    await this.repository.save(carImage);
    return carImage;
  }
}

export { CarImageRepository };
