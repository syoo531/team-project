const jwt = require("jsonwebtoken");
const { User } = require("../models");

const validateCorpAdmin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new Error("엑세스 토큰이 없습니다.");
    }
    let email;

    jwt.verify(
      authorization,
      process.env.ACCESS_TOKEN_SECERT,
      (err, decoded) => {
        if (err) {
          throw new Error("엑세스 토큰이 유효하지 않습니다.");
        } else {
          email = decoded.user.email;
          req.decoded = decoded;
        }
      }
    );
    // 1. 업체관리자인지(admin_role이 1인지 확인)
    // 2. admin_corp 의 value(팝업스토어의 ObjectID)를 찾아서 리턴.
    const user = await User.findOne({ email }).select("admin_role admin_corp");
    if (user.admin_role === 1 && user.admin_corp) {
      req.corpAdminPopupId = user.admin_corp;
      next();
    } else {
      const err = new Error("업체 관리자가 아닙니다.");
      err.statusCode = 404;
      throw err;
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

module.exports = validateCorpAdmin;
