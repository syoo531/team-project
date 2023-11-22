const REST_API_KEY = "b9e0d9e1d07d6c583f83c80677315658";
const REDIRECT_URI = "http://localhost:3000/login/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email,profile_nickname,profile_image`;

const GOOGLE_CLIENT_ID =
  "1047960970936-b4tbcq1jdrqcogukojdbpg1jdf13dsdc.apps.googleusercontent.com";
const GOOGLE_REDIRECT_URI = "http://localhost:3000/login/google";

export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
