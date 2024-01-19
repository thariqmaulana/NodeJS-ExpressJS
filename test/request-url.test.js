import express from "express";
import request from "supertest"

const app = express();

app.get("/hello/world", (request, response) => {
  response.json({
    path: request.path,
    originalUrl: request.originalUrl,
    hostname: request.hostname,
    protocol: request.protocol,
    secure: request.secure
  })
})

test("Request URL", async () => {

  const responseFromServer = await request(app)
    .get("/hello/world")
    .query({name: "thariq"});

  expect(responseFromServer.body).toEqual({
    path: "/hello/world",
    originalUrl: "/hello/world?name=thariq",
    hostname: "127.0.0.1",
    protocol: "http",
    secure: false //true kalau https
  });
})