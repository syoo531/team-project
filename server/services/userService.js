const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

class UserService {
  // 회원 등록 확인
  async checkRegistration(email) {
    // 1. 가입한 경우 2. 가입하지 않은 경우 3. 탈퇴한 경우
    const isRegistered = await User.findOne({ email });

    if (!isRegistered) {
      // 2. 가입하지 않은 경우
      return "unsigned_user";
    }

    if (isRegistered.deleted_at) {
      // 3. 탈퇴한 경우
      return "signout_user";
    }

    return "already_sign";
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
    let is_admin;
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
        { expiresIn: "14d" }
      );

      is_admin = user.admin_role;

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
      { expiresIn: "14d" }
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

  // 유저 정보 불러오기
  async getUserInfo(email) {
    const userInfo = await User.findOne({ email });
    return userInfo;
  }

  // 유저 정보 업데이트
  async updateUserInfo(email, name, phoneNumber, selectedInterests) {
    const userInfo = await User.findOneAndUpdate(
      { email },
      {
        name,
        phone_number: phoneNumber,
        category: selectedInterests,
      }
    );
    return userInfo;
  }

  // 회원 탈퇴
  async signOut(email) {
    const deletedUser = await User.findOneAndUpdate(
      { email },
      { deleted_at: new Date() }
    );
    return deletedUser;
  }

  async changePassword(email, currentPassword, newPassword) {
    const user = await User.findOne({ email });
    if (user.password) {
      const is_pass = await bcrypt.compare(currentPassword, user.password);
      if (user && is_pass) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const changedPasswordUser = await User.findOneAndUpdate(
          { email },
          {
            password: hashedPassword,
          }
        );
        return changedPasswordUser;
      }
    } else {
      return "OAuth_user";
    }
  }
}

module.exports = UserService;
