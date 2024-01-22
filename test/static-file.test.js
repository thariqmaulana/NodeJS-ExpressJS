import express from "express";
import request from "supertest";

const app = express();

//jadi nanti dia akan menyari dulu di folder ini
app.use(express.static(__dirname + "/static"));

// bagaimana jika ada seperti ini? mana yang akan diakses
// dia akan mengambil yang ada di middleware
// app.get("/contoh.txt", (request, response) => {
//   response.send(`Hello Response`);
// })

app.get("/", (request, response) => {
  response.send(`Hello Response`);
})

test("Test Static File", async () => {

  let responseFromServer = await request(app).get("/");
  expect(responseFromServer.text).toBe("Hello Response");

  responseFromServer = await request(app).get("/hello.txt");
  expect(responseFromServer.text).toBe("Hello from static file");
}) 

test("Test Static File hello.txt", async () => {

  const responseFromServer = await request(app).get("/hello.txt");
  //lebih aman pakai toContain ngetest seperti ini
  expect(responseFromServer.text).toBe("Hello from static file");
}) 