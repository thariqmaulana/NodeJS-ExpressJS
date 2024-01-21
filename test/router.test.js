import express from "express";
import request from "supertest";

const app = express();

app.route("/products")
  
const router = express.Router();

//langsung membuat router di dalam use()
router.use((req, res, next) => {
  console.info(`Received request : ${req.originalUrl}`);
  next();
})
router.get("/feature/a" , (req, res) => {
  res.send("feature a");
})

test("Test Router Disabled", async () => {
  //karena routernya belum dijalankan app(router). 
  let response = await request(app).get("/feature/a");
  expect(response.status).toBe(404);
})

test("Test Router Enabled", async () => {
  app.use(router);
  let response = await request(app).get("/feature/a");
  expect(response.text).toBe("feature a");
})