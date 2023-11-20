const axios = require("axios");
const UserService = require("../services/userService");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("잘못된 요청입니다.");
    }
    const userService = new UserService();
    const isRegistered = await userService.checkRegistration(email);

    if (!isRegistered) {
      throw new Error("이미 탈퇴한 회원 입니다!!!");
    }

    const loginResult = await userService.login(email, password);
    if (!loginResult) {
      throw new Error("이메일 또는 비밀번호를 잘못 입력하셨습니다.");
    }
    const [accessToken, is_admin] = loginResult;
    console.log(loginResult);
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json({
        is_admin: is_admin,
        message: "로그인에 성공했습니다!",
      });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber, selectedInterests } = req.body;
    if (!name || !email || !password || !phoneNumber || !selectedInterests) {
      throw new Error("모든 정보가 필요합니다");
    }
    console.log(name, email, password, phoneNumber, selectedInterests);
    const userService = new UserService();
    const isRegistered = await userService.checkRegistration(email);

    if (isRegistered.length !== 0) {
      throw new Error("이미 가입된 이메일입니다!");
    }
    const user = await userService.signUp(
      name,
      email,
      password,
      phoneNumber,
      selectedInterests
    );
    if (!user) {
      throw new Error("서버 오류 입니다.");
    }
    res.status(200).json({ data: null, message: "회원 가입 성공" });
  } catch (err) {
    next(err);
  }
};

const kakaoAuth = async (req, res, next) => {
  const body = {
    grant_type: "authorization_code",
    client_id: "b9e0d9e1d07d6c583f83c80677315658",
    redirect_uri: "http://localhost:3000/login/kakao",
    code: req.body.code,
  };
  try {
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      body,
      {
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    console.log("여기1", response.data);
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
    console.log("여기2", kakaoUser.data);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { login, signup, kakaoAuth };
