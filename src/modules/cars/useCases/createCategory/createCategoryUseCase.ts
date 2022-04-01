import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/appError";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlredyExists = await this.categoriesRepository.findByName(
      name
    );
    if (categoryAlredyExists) {
      throw new AppError("Category alredy exists");
    }

    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
