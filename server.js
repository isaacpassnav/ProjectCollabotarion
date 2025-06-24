const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

connectDB();

app.listen(PORT, () =>{
    console.log(`✅ Web server running at port: ${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}`)
});
