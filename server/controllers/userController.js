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

    const tokens = await userService.login(email, password);
    if (!tokens) {
      throw new Error("이메일 또는 비밀번호를 잘못 입력하셨습니다.");
    }
    const [accessToken, refreshToken, is_admin] = tokens;
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .status(200)
      .json({
        accessToken: accessToken,
        is_admin: is_admin,
        message: "로그인에 성공했습니다!",
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
