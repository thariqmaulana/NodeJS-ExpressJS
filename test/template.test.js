import express from "express";
import request from "supertest";
import mustacheExpress from "mustache-express";

const app = express();

app.set("views", __dirname + "/views"); //templatenya ada dimana
app.set("view engine", "html");//kalau filenya html maka
app.engine("html", mustacheExpress());//kita akan menggunakan enginee mustacheExpress()

app.get("/", (request, response) => {
  response.render("index", {
    title: "Hello World",
    say: "Sended from server using template engine"
  })
})

test("Test Template", async () => {

  const responseFromServer = await request(app).get("/");
  console.info(responseFromServer.text);
  expect(responseFromServer.text).toContain("Hello World");
  expect(responseFromServer.text).toContain("Sended from server using template engine");
})
// isi console. full html yang sudah diubah
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Hello World</title>
// </head>
// <body>
//   <p>Sended from server using template engine</p>
// </body>
// </html>