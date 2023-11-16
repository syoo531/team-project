const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserService {
  // 회원 등록 확인
  async checkRegistration(email) {
    const isRegistered = await User.find({ email: email });
    if (isRegistered.length !== 0 && isRegistered[0].deleted_at) {
      return undefined;
    }

    return isRegistered;
  }

  // 회원 등록
  async signUp(name, email, password, phone_number, address) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      address,
      phone_number,
      admin_role: 0,
    };
    const user = await User.create(newUser);
    return user;
  }

  // 로그인
  async login(email, password) {
    let is_admin = false;
    const user = await User.findOne({ email });
    console.log("여기33", user);
    const is_pass = await bcrypt.compare(password, user.password);
    if (user && is_pass) {
      // access 토큰
      const accessToken = jwt.sign(
        {
          user: {
            username: user.name,
            email: user.email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "30m" }
      );

      // refresh 토큰
      const refreshToken = jwt.sign(
        {
          user: {
            username: user.name,
            email: user.email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "1d" }
      );

      if (user.admin_role !== 0) {
        is_admin = true;
      }

      return [accessToken, refreshToken, is_admin];
    } else return false;
  }
}

module.exports = UserService;
