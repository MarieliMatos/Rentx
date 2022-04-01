import  request  from "supertest";
import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm"
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import {v4 as uuid} from "uuid";

let connection: Connection;
describe("List Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const password = await hash("admin", 8);
    const id = uuid()
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com', '${password}', true, 'now()', 'xxxxxxx')`
    );
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it("should be able to list all available categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com", password: "admin"
    })

    const { token } = responseToken.body;
    
    await request(app).post("/categories").send({
      name: "Sedan",
      description: "Categoria de carro SUV"
    }).set({Authorization: `Bearer ${token}`})

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toEqual("Categoria de carro SUV");
  });

 
})