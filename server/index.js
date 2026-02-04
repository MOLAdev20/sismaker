import express from "express";
import cors from "cors";
import "dotenv/config";

import employee from "./src/routes/Employee.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(employee);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
