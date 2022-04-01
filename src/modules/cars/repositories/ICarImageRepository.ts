import { CarImages } from "../infra/typeorm/entities/carImages";

interface ICarImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImages>;
}

export { ICarImagesRepository };
