import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser("RAHASIA"));//ini tetap harus ada

app.get("/", (request, response) => {
  const name = request.signedCookies['Login'];
  response.send(`Hello ${name}`);
})

test("Test Read Cookie", async () => {

  let responseFromServer = await request(app).get("/")
    .set("Cookie", "Login=s%3AThariq.yAUr68zxUg4fR60ONeKvC9ZOmaZ8sJOsZo3Iimjclos; Path=/");

    expect(responseFromServer.text).toBe("Hello Thariq");

})