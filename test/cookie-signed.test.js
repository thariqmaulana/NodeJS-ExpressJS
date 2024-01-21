import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("RAHASIA"));
app.use(express.json());

app.get("/", (request, response) => {
  const fullName = request.cookies.fullName;
  response.send(`Hello ${fullName}`);
})

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, {path: "/", signed: true});
  res.send(`Hello ${name}`);
})

test("Test Read Cookie", async () => {

  const responseFromServer = await request(app).get("/")
    .set("Cookie", "name=Thariq;fullName=Thariq Maulana");

  expect(responseFromServer.text).toBe("Hello Thariq Maulana");
})

test("Test Write Cookie", async () => {

  let responseFromServer = await request(app).post("/login")
    .send({name: "Thariq"});
    console.info(responseFromServer.get("Set-Cookie").toString());
    expect(responseFromServer.get("Set-Cookie").toString()).toContain("Thariq");

  responseFromServer = await request(app).post("/login")
    .send({name: "Budi"});
    console.info(responseFromServer.get("Set-Cookie").toString());
    expect(responseFromServer.get("Set-Cookie").toString()).toContain("Budi");

    responseFromServer = await request(app).post("/login")
    .send({name: "Thariq"});
    console.info(responseFromServer.get("Set-Cookie").toString());
    expect(responseFromServer.get("Set-Cookie").toString()).toContain("Thariq");
})

