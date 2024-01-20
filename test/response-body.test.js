import express from "express";
import request from "supertest";

const app = express();
app.get("/", (request, response) => {
  response.set("Content-Type", "text/html");
  response.send("<html><body><h1>Hello World</h1></body></html>");
})

test("Test Response Body", async () => {

  const responseFromServer = await request(app).get("/");

  expect(responseFromServer.get("Content-Type")).toContain("text/html");
  expect(responseFromServer.get("Content-Type")).toBe("text/html; charset=utf-8");
  expect(responseFromServer.text).toBe("<html><body><h1>Hello World</h1></body></html>");
})