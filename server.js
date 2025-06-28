const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();
// ⚠️ TEMPORARY: Delete this line after verifying JWT_SECRET is loaded correctly 
console.log("JWT_SECRET desde .env:", process.env.JWT_SECRET); 


const app = express();
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());

connectDB();

//Routes
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);


app.listen(PORT, () =>{
    console.log(`✅ Web server running at port: ${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}`)
});
