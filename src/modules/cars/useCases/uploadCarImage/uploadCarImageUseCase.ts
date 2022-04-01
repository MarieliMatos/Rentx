import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImageRepository";

interface IRequest {
  car_id: string;
  images_names: string[];
}

@injectable()
class uploadCarImageUseCase {
  constructor(
    @inject("CarImageRepository")
    private carsImageRepository: ICarImagesRepository
  ) {}
  async execute({ car_id, images_names }: IRequest): Promise<void> {
    images_names.map(async (images) => {
      await this.carsImageRepository.create(car_id, images);
    });
  }
}

export { uploadCarImageUseCase };
