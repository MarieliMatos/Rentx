import { Specifications } from "@modules/cars/infra/typeorm/entities/specifications";

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../IspecificationsRepository";

class SpecificationInMemory implements ISpecificationRepository {
  specifications: Specifications[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specifications();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specifications> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }

  async findByIds(ids: string[]): Promise<Specifications[]> {
    return this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
  }
}

export { SpecificationInMemory };
