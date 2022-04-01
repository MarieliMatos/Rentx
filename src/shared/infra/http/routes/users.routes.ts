import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/uploads";
import { CreateUserController } from "@modules/account/useCases/createUser/createUserController";
import { UpdateUserAvatarController } from "@modules/account/useCases/updateUserAvatar/updateUserAvatarController";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticate";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUsersController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUsersController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticate,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { usersRoutes };
