import express from "express";
import request from "supertest";

const app = express();

app.get("/products/:idProduct", (request, response) => {
  //bahkan autocomplete paramnya
  const idProduct = request.params.idProduct;
  response.send(`Product : ${idProduct}`);
})

//saya hanya ingin digit idnya
app.get("/categories/:id(\\d+)", (request, response) => {
  const idCategories = request.params.id;
  response.send(`Categories : ${idCategories}`);
})

//lebih dari 1 param misalnya
app.get("/seller/:idSeller/products/:idProduct", (request, response) => {
  const idCategories = request.params.id;
  response.send(`Categories : ${idCategories}`);
})

test("Test Route Parameter", async () => {

  let responseFromServer = await request(app).get("/products/thariq");
  expect(responseFromServer.text).toBe("Product : thariq");

  responseFromServer = await request(app).get("/categories/1234");
  expect(responseFromServer.text).toBe("Categories : 1234");

  responseFromServer = await request(app).get("/categories/nodigit");
  expect(responseFromServer.status).toBe(404);
})