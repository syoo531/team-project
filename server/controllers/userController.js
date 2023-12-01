const UserService = require("../services/userService");
const {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  ConflictError,
  ForbiddenError,
} = require("../config/customError");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("이메일과 패스워드가 모두 필요합니다.");
    }
    const userService = new UserService();
    const isRegistered = await userService.checkRegistration(email);

    if (isRegistered === "unsigned_user") {
      throw new NotFoundError("가입 정보가 없습니다.");
    }
    if (isRegistered === "signout_user") {
      throw new BadRequestError("이미 탈퇴한 회원입니다.");
    }

    const loginResult = await userService.login(email, password);
    if (!loginResult) {
      throw new ForbiddenError("이메일 또는 비밀번호를 잘못 입력하셨습니다.");
    }
    const [accessToken, is_admin] = loginResult;
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
      throw new BadRequestError("모든 정보가 필요합니다");
    }
    const userService = new UserService();
    const isRegistered = await userService.checkRegistration(email);

    if (isRegistered === "already_sign") {
      throw new ConflictError("이미 가입된 이메일입니다!");
    }
    if (isRegistered === "signout_user") {
      throw new BadRequestError("이미 탈퇴한 이메일입니다!");
    }
    const user = await userService.signUp(
      name,
      email,
      password,
      phoneNumber,
      selectedInterests
    );
    if (!user) {
      throw new InternalServerError("서버 오류 입니다.");
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
    const isRegistered = await userService.checkRegistration(email);
    if (isRegistered === "already_sign") {
      // 이미 가입된 경우
      const [accessToken, is_admin] = await userService.oAuthLogin(email);
      res.status(200).json({
        is_admin: is_admin,
        accessToken: accessToken,
        message: "로그인에 성공했습니다!",
      });
    }
    if (isRegistered === "signout_user") {
      // 탈퇴한 이메일인 경우
      throw new BadRequestError("이미 탈퇴한 회원입니다.");
    }
    if (isRegistered === "unsigned_user") {
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
      throw new InternalServerError("서버 오류 입니다.");
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

    const isRegistered = await userService.checkRegistration(email);
    if (isRegistered === "signout_user") {
      // 탈퇴한 경우

      throw new BadRequestError("이미 탈퇴한 회원입니다.");
    }
    if (isRegistered === "already_sign") {
      // 이미 가입된 경우
      const [accessToken, is_admin] = await userService.oAuthLogin(email);

      res.status(200).json({
        is_admin: is_admin,
        accessToken: accessToken,
        message: "로그인에 성공했습니다!",
      });
    }
    if (isRegistered === "unsigned_user") {
      // 해당 이메일로 가입 안된 경우
      res.status(202).json({
        email: email,
        name: name,
        message: "구글로 회원가입합니다!",
      });
    }
  } catch (err) {
    next(err);
  }
};

// 유저 정보 받아오기
const getUserInfo = async (req, res, next) => {
  try {
    const email = req.decoded.user.email;
    const userService = new UserService();
    const userInfo = await userService.getUserInfo(email);

    res.status(200).json({
      message: "가입정보 가져오기 성공",
      data: userInfo,
    });
  } catch (error) {
    next(error);
  }
};

// 유저 정보 수정
const updateUserInfo = async (req, res, next) => {
  try {
    const email = req.decoded.user.email;
    const { name, phoneNumber, selectedInterests } = req.body;
    if (!name || !email || !phoneNumber || !selectedInterests) {
      throw new BadRequestError("모든 정보가 필요합니다");
    }
    const userService = new UserService();
    const userInfo = await userService.updateUserInfo(
      email,
      name,
      phoneNumber,
      selectedInterests
    );

    res.status(200).json({
      message: "회원정보수정 성공",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// 회원 탈퇴
const signOut = async (req, res, next) => {
  try {
    const email = req.decoded.user.email;

    const userService = new UserService();
    const deletedUser = await userService.signOut(email);

    res
      .status(200)
      .json({ data: deletedUser, message: "회원 탈퇴가 처리 되었습니다." });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const email = req.decoded.user.email;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      throw new BadRequestError("모든 정보가 필요합니다");
    }

    const userService = new UserService();
    const changedPasswordUser = await userService.changePassword(
      email,
      currentPassword,
      newPassword
    );
    if (changedPasswordUser === "OAuth_user") {
      throw new BadRequestError(
        "소셜 가입 회원은 비밀번호 변경을 할 수 없습니다."
      );
    }
    res
      .status(200)
      .json({ data: null, message: "비밀번호가 성공적으로 변경되었습니다." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  signup,
  kakaoAuth,
  oAuthSignup,
  googleAuth,
  getUserInfo,
  updateUserInfo,
  signOut,
  changePassword,
};
