import express from "express";

//function ini. return valuenya kita ambil. obj application
const app = express();

//artinya kita membuat routing untuk http method get ke path ini
// ada 2 parameter, request dan response
// 2 parameter ini merupakan representasi dari http request dan response
app.get("/", (request, response) => {
  //kita mau mengembalikan/mengirim response tulisan hello world
  //kita bisa gunakan method send milik response
  //kalau mau html pun bisa
  response.send("Hello World");
})

app.get("/thariq", (request, response) => {
  //wow jadi h1
  response.send("<h1>Hello Thariq</h1>");
})

app.listen(3000, () => {
  console.info("Server started on port 3000");
})