import express from "express";
import request from "supertest";

const app = express();

app.route("/products")
  .get((req, res) => {
    res.send("Get Product");
  })
  .post((req, res) => {
    res.send("Create Product");
  })
  .put((req, res) => {
    res.send("Update Product");
  })

test("Test Route Function", async () => {

  let responseFromServer = await request(app).get("/products");
  expect(responseFromServer.text).toBe("Get Product");

  responseFromServer = await request(app).post("/products");
  expect(responseFromServer.text).toBe("Create Product");

  responseFromServer = await request(app).put("/products");
  expect(responseFromServer.text).toBe("Update Product");
})