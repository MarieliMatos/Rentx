import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/IspecificationsRepository";
import { AppError } from "@shared/errors/appError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationRepository
  ) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carsExists = await this.carsRepository.findById(car_id);

    if (!carsExists) {
      throw new AppError("Car does not exists!");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    carsExists.specifications = specifications;
    await this.carsRepository.create(carsExists);
  }
}

export { CreateCarSpecificationUseCase };
