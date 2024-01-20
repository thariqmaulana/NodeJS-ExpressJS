import express from "express";
import request from "supertest";

const app = express();
app.get("/", (request, response) => {
  
  if (request.query.name) {
    response.status(200);
    response.send(`Hello ${request.query.name}`);
    // for (let i = 0; i < 1000; i++) {
    //   console.info(i);  
    // }
    // response.status(200).send(`Hello ${request.query.name}`)
  } else {
    //mengembalikan response tanpa body. Langsung end()
    response.status(400);
    response.end()
    // console.info("Send2");
    // response.status(400).end();Lebih Ringkas
  }
})

test("Test Response Status", async () => {
  //2 kali mengirim request. tidak perlu membuat 2 variabel
  //dijalankan secara berurutan

  let responseFromServer = await request(app).get("/").query({name: "thariq"});
  expect(responseFromServer.status).toBe(200);
  expect(responseFromServer.text).toBe("Hello thariq");

  responseFromServer = await request(app).get("/");
  expect(responseFromServer.status).toBe(400);
})