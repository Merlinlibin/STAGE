const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
require("dotenv").config();
const userRouter = require("./routes/userRoutes");
const listRouter = require("./routes/listRoute");
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/list", listRouter);
app.use("/api/user", userRouter);

app.listen(PORT, async () => {
  console.log("Connectin to server");
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
