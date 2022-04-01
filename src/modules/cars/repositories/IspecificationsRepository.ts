import { Specifications } from "../infra/typeorm/entities/specifications";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specifications>;
  findByIds(ids: string[]): Promise<Specifications[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
