import express from "express";
import request from "supertest";

const app = express();
 
const errorMiddleware = (err, req, res, next) => {
  res.status(500).send(`Terjadi Error: ${err.message}`);
  //ini akan dibawa ke router tentu saja. messagenya akan diinput di router
}

// app.use(errorMiddleware); harus diletakkan setelah route. untuk mendapatkan message 
// sepertinya.
//berarti route dulu yang dieksekusi baru middleware

app.get("/", (request, response) => {
  throw new Error("Ups");
})

app.use(errorMiddleware);

test("Test Response", async () => {

  const response = await request(app).get("/");

  expect(response.status).toBe(500);
  expect(response.text).toBe("Terjadi Error: Ups");
})