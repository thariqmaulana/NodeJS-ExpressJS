import express from "express";
import request from "supertest"

const app = express();
app.get("/", (request, response) => {
  response.set("Content-Type", "text/html; charset=UTF-8");
  response.sendFile("");//perlu lengkap dari C. mungkin bisa cari alternatif
})

app.listen(2500, () => {
  console.info("Server Started on Port 2500");
})