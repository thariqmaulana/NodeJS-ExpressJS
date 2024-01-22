import express from "express";
import request from "supertest";

const app = express();
app.get("/", (request, response) => {
  response.send(`Hello Response`);
})

app.use((req, res, next) => {
  res.status(404).send("404 NOT FOUND");
})

test("Test Response Success", async () => {

  const responseFromServer = await request(app).get("/");
  expect(responseFromServer.text).toBe("Hello Response");
})

test("Test Response Error Not Found", async () => {

  const responseFromServer = await request(app).get("/tidakada");
  expect(responseFromServer.text).toBe("404 NOT FOUND");
  expect(responseFromServer.status).toBe(404);
})