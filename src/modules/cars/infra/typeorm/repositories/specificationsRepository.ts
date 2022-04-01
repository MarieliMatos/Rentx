import { getRepository, Repository } from "typeorm";

import { Specifications } from "@modules/cars/infra/typeorm/entities/specifications";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "@modules/cars/repositories/IspecificationsRepository";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specifications>;

  constructor() {
    this.repository = getRepository(Specifications);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });
    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specifications> {
    const specification = this.repository.findOne({
      name,
    });
    return specification;
  }

  findByIds(ids: string[]): Promise<Specifications[]> {
    throw new Error("Method not implemented.");
  }
}

export { SpecificationRepository };
