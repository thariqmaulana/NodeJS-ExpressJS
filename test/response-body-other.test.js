import express from "express";
import request from "supertest"

const app = express();
app.get("/", (request, response) => {
  response.send("Hello World");
})

test("Test Request", async () => {
  const responseFromServer = await request(app).get("/");
  expect(responseFromServer.text).toBe("Hello World");
})