import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "@modules/cars/repositories/IspecificationsRepository";
import { AppError } from "@shared/errors/appError";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpacificationsUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlredyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlredyExists) {
      throw new AppError("Specification Alredy exists");
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpacificationsUseCase };
