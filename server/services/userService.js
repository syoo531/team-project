const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

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

  // 카카오 인증
  async kakaoAuth(code) {
    const body = {
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_REST_KEY,
      redirect_uri: "http://localhost:3000/login/kakao",
      code: code,
    };
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      body,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    const accessToken = response.data.access_token;
    const kakaoUser = await axios.post(
      "https://kapi.kakao.com/v2/user/me",
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    return [
      kakaoUser.data.id,
      kakaoUser.data.kakao_account.email,
      kakaoUser.data.properties.nickname,
    ];
  }

  // 카카오 가입
  async oAuthSignUp(name, email, phoneNumber, selectedInterests) {
    const newUser = {
      name,
      email,
      phone_number: phoneNumber,
      category: selectedInterests,
      admin_role: 0,
    };
    const user = await User.create(newUser);
    return user;
  }

  // 소셜 로그인
  async oAuthLogin(email) {
    let is_admin = false;
    const user = await User.findOne({ email });

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
  }

  // 구글 인증
  async googleAuth(code) {
    const body = {
      code: code,
      grant_type: "authorization_code",
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/login/google",
    };
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      body,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    console.log("여기3", response.data);
    const accessToken = response.data.access_token;
    const googleUser = await axios.get(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        params: {
          access_token: accessToken,
        },
      }
    );
    return [googleUser.data.id, googleUser.data.email, googleUser.data.name];
  }
}

module.exports = UserService;
