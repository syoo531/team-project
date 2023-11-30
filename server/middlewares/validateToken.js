const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("엑세스 토큰이 없습니다.");
    }

    jwt.verify(
      authorization,
      process.env.ACCESS_TOKEN_SECERT,
      (err, decoded) => {
        if (err) {
          throw new Error("엑세스 토큰이 유효하지 않습니다.");
        } else {
          req.decoded = decoded;
          next();
        }
      },
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = validateToken;
