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
        // 쿠키 사인으로 해싱한다. secure
        httpOnly: true, // 리프레시 토큰을 쿠키나 로컬스토리지가 아니라 글로벌스테이트(리덕스,리코일)에 저장한다
        sameSite: "strict", // 세션: 서버 메모리에 저장, 토큰: 사용자에게 저장, MSA방식
      }) // 토큰을 저장 1쿠키,2로컬스토리지,세션스토리지,클라이언트메모리
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
