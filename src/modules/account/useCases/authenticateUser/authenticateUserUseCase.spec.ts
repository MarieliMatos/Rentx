import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/in-memory/usersRepositoryInMemory";
import { AppError } from "@shared/errors/appError";

import { CreateUserUseCase } from "../createUser/createUserUseCase";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to autheticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@teste.com",
      name: "User Teste",
      password: "123123",
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@test.com",
        password: "123123",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be ablo to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "999999",
        email: "user@user.com",
        name: "User Teste",
        password: "123123",
      };
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
