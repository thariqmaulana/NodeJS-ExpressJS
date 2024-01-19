import express from "express";
import request from "supertest";

const app = express();
app.get("/", (request, response) => {
  // mengambil data query client
  //mungkin kedepannya bisa digunakan dalam percabangan, jika querynya a maka ...
  response.send(`Hello ${request.query.firstName} ${request.query.lastName}`);
})

test("Test With Query Parameter 2", async () => {

  const responseFromServer = await request(app)
    .get("/")
    .query({firstName: "thariq", lastName: "maulana"});
  
  expect(responseFromServer.text).toBe("Hello thariq maulana");
})