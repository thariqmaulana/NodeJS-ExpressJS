import express from "express";
import request from "supertest";

const app = express();
//* : semua
app.get("/products/*.json", (request, response) => {
  response.send(request.originalUrl);
})

//desimal. +lebih dari 1. \\ 2kali di JS
// apapun tapi akhirnya harus angka
//contoh 123. contoh12 akan dianggap *. dan 3 akan dianggap d
app.get("/categories/*(\\d+).json", (request, response) => {
  response.send(request.originalUrl);
})

//semua regex bisa ini 
// app.get("/categories/*(\\d+)*.json", (request, response) => {
//   response.send(request.originalUrl);
// })

//sepertinya berguna untuk online shop di searching
test("Test Route Path", async () => {

  let responseFromServer = await request(app).get("/products/thariq.json");
  expect(responseFromServer.text).toBe("/products/thariq.json");

  // * akan dianggap kosong.1 akan dianggap d. yang penting akhirnya angka
  responseFromServer = await request(app).get("/categories/1.json");
  expect(responseFromServer.text).toBe("/categories/1.json");

  //*123. d= 4
  responseFromServer = await request(app).get("/categories/1234.json");
  expect(responseFromServer.text).toBe("/categories/1234.json");

  //default 404
  responseFromServer = await request(app).get("/categories/nonumber.json");
  expect(responseFromServer.status).toBe(404);
})