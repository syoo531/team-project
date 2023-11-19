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
  async signUp(name, email, password, phoneNumber, selectedInterests) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone_number: phoneNumber,
      category: selectedInterests,
      admin_role: 0,
    };
    const user = await User.create(newUser);
    return user;
  }

  // 로그인
  async login(email, password) {
    let is_admin = false;
    const user = await User.findOne({ email });
    const is_pass = await bcrypt.compare(password, user.password);
    if (user && is_pass) {
      // access 토큰
      const accessToken = jwt.sign(
        {
          user: {
            username: user.name,
            email: user.email,
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "1d" }
      );

      if (user.admin_role !== 0) {
        is_admin = true;
      }

      return [accessToken, is_admin];
    } else return false;
  }
}

module.exports = UserService;
