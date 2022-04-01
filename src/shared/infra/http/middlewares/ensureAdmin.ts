import { NextFunction, Request, Response } from "express";

import { UserRepository } from "@modules/account/infra/typeorm/repositories/UsersRpository";
import { AppError } from "@shared/errors/appError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UserRepository();

  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User is not admin!");
  }

  return next();
}
