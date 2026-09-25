const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const employeeRoutes = require("./routes/employeeRoutes");

  dotenv.config();
  connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.use("/api/employees", employeeRoutes);
app.get("/", (req, res) => {
  res.send("Employee Api is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
