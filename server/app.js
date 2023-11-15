const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/userRouter");

const app = express();

// mongoose
//   .connect(process.env.MONGO_DB_URL)
//   .then(() => {
//     console.log("MongoDB에 연결되었습니다.");
//   })
//   .catch((error) => {
//     console.error("MongoDB 연결 실패:", error);
//   });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening Port on ${process.env.PORT}`);
});
