const REST_API_KEY = "b9e0d9e1d07d6c583f83c80677315658";
const REDIRECT_URI = "http://localhost:3000/login/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image`;
