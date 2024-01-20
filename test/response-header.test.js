import express from "express";
import request from "supertest";

const app = express();
app.get("/", (request, response) => {
  //kalau cuma 1 
  // response.set("Content-Type", "application/json");
  response.set({
    "X-Author": "Thariq Maulana",
    "Content-Type": "text/plain; charset=utf-8"
  }).send("Hello");
})

test("Test Response Header", async () => {

  const responseFromServer = await request(app).get("/");
  //untuk mendapatkan header, kita gunakan get
  expect(responseFromServer.get("X-Author")).toBe("Thariq Maulana");
  expect(responseFromServer.get("Content-Type")).toBe("text/plain; charset=utf-8");
  expect(responseFromServer.text).toBe("Hello");
})