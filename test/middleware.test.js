import express from "express";
import request from "supertest";

const logger = (request, response, next) => {
  console.info(`Receive request: ${request.method} ${request.originalUrl}`);
  next();
}

const addPoweredHeader = (request, response, next) => {
  response.set("X-Powered-By", "Thariq");
  next();
}

const apiKeyMiddleware = (request, response, next) => {
  if (request.query.apiKey) {
    next();
  } else {
    response.status(401);
    //bisa kirim apa saja. misalnya html anda belum login
    response.end();
  }
}

const requestTimeMiddleware = (request, response, next) => {
  //request client itu bentuknya obj JS. jadi bisa kita manipulasi sesuai object
  //kita bisa tambahkan atribut
  request.requestTime = Date.now();
  next();
}

const app = express();

//sesuai urutan
app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredHeader);
app.use(requestTimeMiddleware);

app.get("/", (request, response) => {
  response.send(`Hello Response`);
})

app.get("/thariq", (request, response) => {
  response.send(`Hello Thariq`);
})

app.get("/time", (request, response) => {
  response.send(`The time is ${request.requestTime}`);
})

test("Test Response Middleware", async () => {

  const responseFromServer = await request(app).get("/").query({apiKey: "5533"});

  expect(responseFromServer.get("X-Powered-By")).toBe("Thariq");
  expect(responseFromServer.text).toBe("Hello Response");
})


test("Test Response Middleware 2", async () => {

  const responseFromServer = await request(app).get("/thariq").query({apiKey: "5533"});

  expect(responseFromServer.get("X-Powered-By")).toBe("Thariq");
  expect(responseFromServer.text).toBe("Hello Thariq");
})

test("Test Response Middleware Unauthorized", async () => {

  const responseFromServer = await request(app).get("/thariq");

  // expect(responseFromServer.get("X-Powered-By")).toBe("Thariq");
  // expect(responseFromServer.text).toBe("Hello Thariq");
  expect(responseFromServer.status).toBe(401);
})

test("Test Response Middleware Time", async () => {

  const responseFromServer = await request(app).get("/time").query({apiKey: "5533"});

  expect(responseFromServer.get("X-Powered-By")).toBe("Thariq");
  //karena waktu
  expect(responseFromServer.text).toContain("The time is");
})