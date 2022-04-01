import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UserRepository } from "@modules/account/infra/typeorm/repositories/UsersRpository";
import { AppError } from "@shared/errors/appError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Ivalid Token", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "ef0cd5cba4516456605e625e840669b0"
    ) as IPayload;

    const userRepository = new UserRepository();

    const user = userRepository.findById(user_id);

    if (!user) {
      throw new AppError("Ivalid Token", 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Ivalid Token", 401);
  }
}
