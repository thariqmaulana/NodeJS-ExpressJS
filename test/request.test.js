import express from "express";
import request from "supertest"

//seperti biasa membuat server dulu
const app = express();
app.get("/", (request, response) => {
  response.send("Hello World");
})

test("Test Request", async () => {
  //membuat simulasi request. jadi tidak perlu menggunakan browser
  // inilah kegunaan supertest
  //request ke app.dengan method get
  //returnnya adalah promise. makanya harus async function
  //returnnya adalah sebuah response. respose.text itu bawaan. autocomplete
  const responseFromServer = await request(app).get("/");
  // console.info(responseFromServer);
  expect(responseFromServer.text).toBe("Hello World");
})