const UserService = require("../services/userService");
const bcrypt = require("bcrypt");

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
    res.status(200).json({
      is_admin: is_admin,
      accessToken: accessToken,
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
  try {
    const code = req.body.code;
    const userService = new UserService();
    const [kakao_id, email, name] = await userService.kakaoAuth(code);
    console.log([kakao_id, email, name]); // [카카오회원번호, 이메일, 닉네임]
    const isRegistered = await userService.checkRegistration(email);
    if (isRegistered.length !== 0) {
      // 이미 가입된 경우
      console.log("이미가입", isRegistered);
      const [accessToken, is_admin] = await userService.oAuthLogin(email);
      res.status(200).json({
        is_admin: is_admin,
        accessToken: accessToken,
        message: "로그인에 성공했습니다!",
      });
    } else {
      // 해당 이메일로 가입 안된 경우
      res.status(202).json({
        email: email,
        name: name,
        message: "카카오로 회원가입합니다!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const oAuthSignup = async (req, res, next) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const name = req.body.name;
    const selectedInterests = req.body.selectedInterests;
    const userService = new UserService();

    const user = await userService.oAuthSignUp(
      name,
      email,
      phoneNumber,
      selectedInterests
    );
    if (!user) {
      throw new Error("서버 오류 입니다.");
    }
    const [accessToken, is_admin] = await userService.oAuthLogin(email);
    res.status(200).json({
      is_admin: is_admin,
      accessToken: accessToken,
      message: "로그인에 성공했습니다!",
    });
  } catch (err) {
    console.log(err);
  }
};

const googleAuth = async (req, res, next) => {
  try {
    const code = req.body.code;
    const userService = new UserService();

    const [google_id, email, name] = await userService.googleAuth(code);
    console.log([google_id, email, name]); // [구글회원번호, 이메일, 이름]
    const isRegistered = await userService.checkRegistration(email);
    if (isRegistered.length !== 0) {
      // 이미 가입된 경우
      console.log("이미가입", isRegistered);
      const [accessToken, is_admin] = await userService.oAuthLogin(email);
      res.status(200).json({
        is_admin: is_admin,
        accessToken: accessToken,
        message: "로그인에 성공했습니다!",
      });
    } else {
      // 해당 이메일로 가입 안된 경우
      res.status(202).json({
        email: email,
        name: name,
        message: "구글로 회원가입합니다!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { login, signup, kakaoAuth, oAuthSignup, googleAuth };
