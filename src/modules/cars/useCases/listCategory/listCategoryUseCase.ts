import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/category";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository";

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepositories: ICategoryRepository
  ) {}

  execute(): Promise<Category[]> {
    const categories = this.categoriesRepositories.list();
    return categories;
  }
}

export { ListCategoryUseCase };
