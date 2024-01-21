import express from "express";
import request from "supertest";

const app = express();
app.get("/", (request, response) => {
  response.redirect("/to-next-page")
})

app.get("/to-next-page", (request, response) => {
  response.send("You are redirect to here");
})


app.listen(3000, () => {
  console.info("Started at port 3000");
});