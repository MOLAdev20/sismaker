import express from "express";
import cors from "cors";
import "dotenv/config";

import auth from "./src/routes/Auth.js";
import employee from "./src/routes/Employee.js";
import requireAuth from "./src/middleware/requireAuth.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", auth);
app.use(requireAuth, employee);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
