import express from "express";
import request from "supertest";

const app = express();
app.get("/", (request, response) => {
  response.send(`Hello ${request.query.name}`);
  console.info(request.query)// {name: "Thariq"}
  console.info(request.originalUrl)// /?name=Thariq
})

test("Test With Query Parameter", async () => {

  //query berbentuk object dengan key: value. keyparam=valueparam
  const responseFromServer = await request(app).get("/").query({name: "Thariq"});
  
  expect(responseFromServer.text).toBe("Hello Thariq");
})