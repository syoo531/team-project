const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/DBConnection");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandler");
const popupStoreRouter = require("./routes/popupStoreRouter");
const cookieParser = require("cookie-parser");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/popupStore", popupStoreRouter);

app.use(errorHandler); // 에러 처리 미들웨어

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(4000, () => {
    console.log(`Server running on port 4000`);
  });
});
