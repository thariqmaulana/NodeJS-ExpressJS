import express from "express";
import request from "supertest";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));//supaya tidak membaca dari query param
// x-www-form-urlencoded.lihat "url-encoded"

app.post("/json", (request, response) => {
  const name = request.body.name;
  //kita balas dalam bentuk json juga misalnya
  response.json({
    messageFromServer: `Hello ${name}`
  })
})

app.post("/form", (request, response) => {
  const name = request.body.pesan;
  response.json({
    messageFromServer: `Hello ${name}`
  })
})

test("Test Request JSON", async () => {

  const response = await request(app)
    .post("/json")
    .set("Content-Type", "application/json")//biar client tau
    .send({
      name: "Thariq"
    });
    console.info(response.body)//berarti otomatis di konversi menjadi obj lagi ketika diterima
  expect(response.body).toEqual({
    messageFromServer: "Hello Thariq"
  });
})

test("Test Request Form", async () => {

  const response = await request(app)
    .post("/form")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .send("pesan=World");

  expect(response.body).toEqual({
    messageFromServer: "Hello World"
  });
})