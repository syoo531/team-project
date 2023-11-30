const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/DBConnection");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandler");
const popupStoreRouter = require("./routes/popupStoreRouter");
const waitingRouter = require("./routes/waitingRouter");
const reservationRouter = require("./routes/reservationRouter");
const popupListRouter = require("./routes/popupListRouter");
const searchRouter = require("./routes/searchRouter");
const reviewRouter = require("./routes/reviewRouter");
const interestRouter = require("./routes/interestRouter");

const cookieParser = require("cookie-parser");

connectDB();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/waiting", waitingRouter);
app.use("/api/reservation", reservationRouter);
app.use("/api/popupStore", popupStoreRouter);
app.use("/api/popupList", popupListRouter);
app.use("/api/search", searchRouter);
app.use("/api/interest", interestRouter);
app.use("/api/review", reviewRouter);

app.use(errorHandler); // 에러 처리 미들웨어

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(4000, () => {
    console.log(`Server running on port 4000`);
  });
});
