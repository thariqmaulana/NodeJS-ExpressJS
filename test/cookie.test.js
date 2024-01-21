import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());//karena .send({name: "Thariq"})

app.get("/", (request, response) => {
  // kalau lebih dari 1 kata maka pakai [first name]
  const fullName = request.cookies.fullName;
  response.send(`Hello ${fullName}`);
})

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, {path: "/"});
  res.send(`Hello ${name}`);
})

test("Test Read Cookie", async () => {

  const responseFromServer = await request(app).get("/")
    .set("Cookie", "name=Thariq;fullName=Thariq Maulana");//2 cookie dipisahkan dengan ;

  expect(responseFromServer.text).toBe("Hello Thariq Maulana");
})

test("Test Write Cookie", async () => {

  const responseFromServer = await request(app).post("/login")
    .send({name: "Thariq"});
    //Path bukan path
    console.info(responseFromServer.get("Set-Cookie"))// [ 'Login=Thariq; Path=/' ]
    console.info(responseFromServer.get("Set-Cookie").toString())// 'Login=Thariq; Path=/'
  expect(responseFromServer.get("Set-Cookie")).toContain("Login=Thariq; Path=/");
  expect(responseFromServer.get("Set-Cookie").toString()).toContain("Login=Thariq; Path=/");
  expect(responseFromServer.text).toBe("Hello Thariq");
})
