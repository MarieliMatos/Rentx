import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarUseCase } from "./listAvailableCarUseCase";

class ListAvailCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query;

    const listAvailableCarUseCase = container.resolve(ListAvailableCarUseCase);

    const cars = await listAvailableCarUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return response.json(cars);
  }
}

export { ListAvailCarsController };
