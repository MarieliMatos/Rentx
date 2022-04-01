import { Request, Response } from "express";
import { container } from "tsyringe";

import { uploadCarImageUseCase } from "./uploadCarImageUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];
    const uploadCarimagesUseCase = container.resolve(uploadCarImageUseCase);

    const images_names = images.map((file) => file.filename);

    await uploadCarimagesUseCase.execute({
      car_id: id,
      images_names,
    });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
