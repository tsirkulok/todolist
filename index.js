const express = require("express");
require("dotenv").config();
const listRoutes = require("./listRoutes")
const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use("/ToDo-List", listRoutes)
app.listen(PORT, ()=>{
    console.log("Сервер запущено")
})