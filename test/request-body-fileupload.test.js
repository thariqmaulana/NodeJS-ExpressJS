import express from "express";
import request from "supertest";
import expressFileUpload from "express-fileupload"; 

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(expressFileUpload());

app.post("/file", async (req, res) => {
  const textFile = req.files.article;
  await textFile.mv(__dirname + "/upload/" + textFile.name)
  // name dan mv ini bawaan. untuk mengetahui namafile dan memindahkan file

  //kita kirim file dan name;
  res.send(`Hello ${req.body.name}, you uploaded ${textFile.name}`);
})

test("Test Request Body File Upload", async () => {

  const response = await request(app)
    .post("/file")
    .set("Content-Type", "multipart/form-data")
    .field("name", "Thariq")
    .attach("article", __dirname + "/contoh.txt");
  //otomatis terupload ke folder upload
  expect(response.text).toEqual("Hello Thariq, you uploaded contoh.txt");
  //kalau menjalankan 2 kali yang terupload tetap 1
})