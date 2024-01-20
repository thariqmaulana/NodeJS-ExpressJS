import express from "express";
import request from "supertest";

const app = express();
app.get("/", (request, response) => {
  const type = request.get("Accept");
  response.send(`Hello ${type}`);
})

test("Test Request Header", async () => {

  const responseFromServer = await request(app)
    .get("/")
    .set("Accept", "text/plain");
  
  expect(responseFromServer.text).toBe("Hello text/plain");
})