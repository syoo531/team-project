const jwt = require("jsonwebtoken");
const { User } = require("../models");

const validateServiceAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      const err = new Error("엑세스 토큰이 없습니다.");
      err.statusCode = 400;
      throw err;
      //throw new Error("엑세스 토큰이 없습니다.");
    }
    let email;

    jwt.verify(
      authorization,
      process.env.ACCESS_TOKEN_SECERT,
      (err, decoded) => {
        if (err) {
          const err = new Error("엑세스 토큰이 유효하지 않습니다.");
          err.statusCode = 400;
          throw err;
          //throw new Error("엑세스 토큰이 유효하지 않습니다.");
        } else {
          email = decoded.user.email;
        }
      }
    );
    // 1. 서비스관리자인지(admin_role이 2인지 확인)

    const user = await User.findOne({ email }).select("admin_role");
    if (user.admin_role === 2) {
      next();
    } else {
      const err = new Error("서비스 관리자가 아닙니다.");
      err.statusCode = 400;
      throw err;
      //res.status(400).json({ message: "서비스 관리자가 아닙니다." });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = validateServiceAdmin;
