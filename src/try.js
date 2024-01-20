import express from "express";
import request from "supertest";

const app = express();
app.get("/", (request, response) => {
  response.set("Content-Type", "text/html");
  response.send("<html><body><h1>Hello World from try.js</h1></body></html>");
})

app.listen(3000, () => {
  console.info("Server started on port 3000");
})