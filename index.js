const express = require("express");
const authRoutes = require('./authRoutes');

require("dotenv").config();
const listRoutes = require("./listRoutes");
const app = express();
const PORT = process.env.PORT
app.use(express.json());
app.use("/ToDo-List", listRoutes);
app.use('/auth', authRoutes);
app.listen(PORT, ()=>{
    console.log("Сервер запущено")
})