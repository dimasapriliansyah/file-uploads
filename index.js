//=== DEPENDENCIES ===//
require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const methodOverride = require('method-override')
const helmet = require('helmet')

const minioClient = require("./connection/minio")
const serverErrorHandling = require("./libs/serverErrorHandling")

//=== IMPORT ROUTES ===//
const userRoutes = require("./routes/UserRoute");
const uploadRoutes = require("./routes/UploadRoute");

//=== APP START HERE ===//
const app = express()

//=== APP MIDDLEWARE STACK ===//
app.use(helmet())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use(bodyParser.json({
  limit: "100kb",
  strict: true,
  type: "application/json"
}))


//=== APP ROUTES REGISTER ===//
app.use("/user", userRoutes)
app.use("/upload", uploadRoutes)

app.get("/", (req, res, next) => {
  res.send("This is index routes.")
})

// 404 Not found
app.use("/", (req, res, next) => {
  res.status(404).send("routes not found")
})

// Override express error handling.
app.use(methodOverride())
app.use(serverErrorHandling)

//=== APP LISTENING ===//
const PORT = parseInt(process.env.APP_PORT) || 3000
const HOST = process.env.APP_HOST || "http://localhost"
app.listen(PORT, () => {
  console.log("[File uploads service] URL: ", HOST + ":" + PORT)
})