import express from "express";
import request from "supertest";

const app = express();
app.get("/", (request, response) => {
  response.redirect("/to-next-page")
})

test("Test Response Redirect", async () => {

  const responseFromServer = await request(app).get("/");
  expect(responseFromServer.status).toBe(302);//default
  expect(responseFromServer.get("Location")).toBe("/to-next-page");
})