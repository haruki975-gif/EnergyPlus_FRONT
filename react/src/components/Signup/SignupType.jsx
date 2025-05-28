import React from "react";
import { useNavigate } from "react-router-dom";
import { getKakaoLoginURL } from "../../services/authService";
import {
  SignupTypeContainer,
  SignupTypeTitle,
  SignupTypeContent,
  KakaoSignupButton,
  EmailSignupButton,
  OrDivider,
} from "./SignupType.style";
import kakaoLogo from "../../assets/kakao_logo.png";
const SignupType = () => {
  const navigate = useNavigate();
  // 카카오 회원가입/로그인
  const handleKakaoSignup = async () => {
    try {
      // 서비스 함수를 사용하여 카카오 인증 URL 가져오기
      const kakaoAuthURL = await getKakaoLoginURL();
      window.location.href = kakaoAuthURL;
    } catch (error) {
      console.log("카카오인증 URL 요청실패 : ", error);
    }
  };
  // 이메일 회원가입
  const handleEmailSignup = () => {
    navigate("/signup-form");
  };
  return (
    <SignupTypeContainer>
      <SignupTypeTitle>회원 가입</SignupTypeTitle>
      <SignupTypeContent>
        <KakaoSignupButton onClick={handleKakaoSignup}>
          <img src={kakaoLogo} alt="카카오 로고" />
          <span>카카오로 가입</span>
        </KakaoSignupButton>
        <OrDivider>
          <span>또는</span>
        </OrDivider>
        <EmailSignupButton onClick={handleEmailSignup}>
          이메일로 가입
        </EmailSignupButton>
      </SignupTypeContent>
    </SignupTypeContainer>
  );
};
export default SignupType;
