import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// 로그인 상태 확인
export const checkAuthStatus = () => {
  const token = sessionStorage.getItem("accessToken");
  return !!token;
};

// 일반 로그인
export const login = (userEmail, userPassword) => {
  return axios
    .post(`${API_URL}/auth/login`, {
      userEmail,
      userPassword,
    })
    .then((response) => {
      // 성공 -> 응답데이터 반환
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

// 카카오 로그인 URL 가져오기
export const getKaKaoLoginURL = () => {
  // 백엔드에서 카카오 로그인 URL 가져오기
  return axios
    .get(`${API_URL}/oauth2/kakao/url`)
    .then((response) => {
      // 성공시 로그인 URL 반환
      return response.data.loginUrl;
    })
    .catch((error) => {
      const KAKAO_CLIENT_ID =
        window.ENV?.KAKAO_CLIENT_ID || import.meta.env.VITE_KAKAO_CLIENT_ID;
      const KAKAO_REDIRECT_URI =
        window.ENV?.KAKAO_REDIRECT_URI ||
        import.meta.env.VITE_KAKAO_REDIRECT_URI;

      return `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
    });
};

// 카카오 로그인 처리
export const processKakaoLogin = (code) => {
  // 백엔드에 카카오 인증코드 전송
  return axios
    .get(`${API_URL}/oauth2/kakao/callback?code=${code}`)
    .then((response) => {
      // 성공 -> 사용자 정보 반환
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

// 로그아웃
export const logout = async () => {
  try {
    // 백엔드 로그아웃 요청 (토큰 삭제)
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } catch (error) {
    console.error("로그아웃 오류:", error);
  } finally {
    // 세션 스토리지 클리어
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userRole");

    // 로그인 상태변경 이벤트 발생
    window.dispatchEvent(new Event("loginStateChanged"));
  }
};

// 사용자 정보 가져오기
export const getCurrentUser = () => {
  return {
    email: sessionStorage.getItem("userEmail"),
    name: sessionStorage.getItem("userName"),
    role: sessionStorage.getItem("userRole"),
  };
};
