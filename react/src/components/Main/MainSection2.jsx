import React from "react";
import mainImg from "../../assets/img/main02.jpg";
import main03 from "../../assets/img/main03.jpg";
import mini1 from "../../assets/img/mini1.jpg";
import mini2 from "../../assets/img/mini2.jpg";
import mini3 from "../../assets/img/mini3.jpg";
import { useNavigate } from "react-router-dom";

import {
  Hero,
  HeroContent,
  Button,
  InfoSectionGrid,
  InfoCard,
  CardImage,
  CardTitle,
  HighlightSection,
  HighlightGrid,
  HighlightItem,
  ParticipateSection,
  MileageSection,
  ActionSection,
  StepSection,
  StepList,
} from "./MainSection2.style";

import {
  FaLeaf,
  FaTree,
  FaPiggyBank,
  FaGift,
  FaHandsHelping,
  FaBicycle,
  FaBoxOpen,
} from "react-icons/fa";

const MainSection2 = () => {

  const navi = useNavigate();
  const token = sessionStorage.getItem("accessToken");

  return (
    <>
      <Hero img={mainImg}>
        <HeroContent>
          <h1>탄소 절감, 함께 실천해요</h1>
          <p>작은 실천이 지구를 바꿉니다</p>
          <div>
            <Button onClick={() => navi("/mileageInfo")}>참여 안내</Button>
            <Button
              secondary
              onClick={() => {
                if (token) {
                  navi("/mypage_qna"); // 로그인 상태 → 마이페이지로 이동
                } else {
                  alert("로그인이 필요합니다.");
                  navi("/login"); // 비로그인 상태 → 로그인 페이지로 이동
                }
              }}
            >
              문의하기
            </Button>
          </div>
        </HeroContent>
      </Hero>

      <InfoSectionGrid>
        <div className="text-block">
          <h2>소개</h2>
          <p>
            에너지생활+는 일상 속 탄소 절감을 통해 기후위기에 대응하고,
            마일리지를 통해 실질적인 혜택을 제공하는 시민 참여 플랫폼입니다.
          </p>
        </div>

        <div className="cards-block">
          <InfoCard>
            <CardImage style={{ backgroundImage: `url(${mini3})` }} />
            <CardTitle>실천 이야기</CardTitle>
          </InfoCard>
          <InfoCard>
            <CardImage style={{ backgroundImage: `url(${mini2})` }} />
            <CardTitle>마일리지 사용법</CardTitle>
          </InfoCard>
          <InfoCard>
            <CardImage style={{ backgroundImage: `url(${mini1})` }} />
            <CardTitle>참여 후기</CardTitle>
          </InfoCard>
        </div>
      </InfoSectionGrid>

      <HighlightSection>
        <h2>탄소 절감, 이렇게 좋은 점이 많아요!</h2>
        <HighlightGrid>
          <HighlightItem>
            <FaLeaf size={32} />
            <strong>에너지 효율 향상</strong>
            <p>전기 사용량 줄고, 경제적 이득까지!</p>
          </HighlightItem>
          <HighlightItem>
            <FaTree size={32} />
            <strong>도시 녹지 확대</strong>
            <p>평균 17% 이상 탄소 배출 감소!</p>
          </HighlightItem>
          <HighlightItem>
            <FaPiggyBank size={32} />
            <strong>비용 절감</strong>
            <p>가정/기업 모두 혜택!</p>
          </HighlightItem>
        </HighlightGrid>
      </HighlightSection>

      <ParticipateSection img={main03}>
        <div className="background" />
        <div className="overlay">
          <h2>당신의 작은 실천</h2>
          <p>
            탄소 절감 + 마일리지 + 기부까지! <br />
            자동차 대신 자전거, 일회용기 대신 다회용기 <br />
            이용 습관을 바꾸면 마일리지가 쌓입니다!
          </p>
          <Button secondary onClick={() => navi("/mileageInfo")}>지금 참여하기</Button>
        </div>
      </ParticipateSection>


      <MileageSection>
        <h2>
          <FaGift size={24} /> 마일리지는 어떻게 쓰나요?
        </h2>
        <ul>
          <li>
            <FaGift /> 상품권 교환 – 제휴 카페, 마트, 편의점 등
          </li>
          <li>
            <FaHandsHelping /> 기부 전환 – 환경단체 및 취약계층 지원
          </li>
        </ul>
        <p>
          작은 습관이 나를 위한 혜택이 되고, 누군가에게도 따뜻한 힘이 됩니다.
        </p>
        <Button
          onClick={() => {
            if (token) {
              navi("/mileagestore"); // 로그인 상태 → 마일리지 사용처로 이동
            } else {
              alert("로그인이 필요합니다.");
              navi("/login"); // 비로그인 상태 → 로그인 페이지로 이동
            }
          }}
        >
          마일리지 사용처 보기
        </Button>
      </MileageSection>

      <ActionSection>
        <h2>실천 항목별 소개</h2>
        <HighlightGrid>
          <HighlightItem>
            <FaBicycle size={35} />
            <strong>출퇴근길, 자전거로 바꾸기</strong>
            <p style={{marginBottom: "15px"}}>탄소 감축+건강+마일리지 혜택까지!</p>
            <Button
              onClick={() => {
                if (token) {
                  navi("/mileage-form"); // 로그인 상태 → 자전거 인증으로 이동
                } else {
                  alert("로그인이 필요합니다.");
                  navi("/login"); // 비로그인 상태 → 로그인 페이지로 이동
                }
              }}
            >
              자전거 인증 바로가기
            </Button>
          </HighlightItem>
          <HighlightItem>
            <FaBoxOpen size={35} />
            <strong>다회용기 습관화</strong>
            <p style={{marginBottom: "15px"}}>텀블러, 도시락통 인증 시마다 적립!</p>
            <Button
              onClick={() => {
                if (token) {
                  navi("/mileage-form"); // 로그인 상태 → 다회용기 인증으로 이동
                } else {
                  alert("로그인이 필요합니다.");
                  navi("/login"); // 비로그인 상태 → 로그인 페이지로 이동
                }
              }}
            >
              다회용기 인증하러 가기
            </Button>
          </HighlightItem>
        </HighlightGrid>
      </ActionSection>

      <StepSection>
        <h2>참여는 이렇게 쉬워요!</h2>
        <StepList>
          <li>회원가입</li>
          <li>실천하고 사진 인증</li>
          <li>마일리지 적립</li>
          <li>상품권 교환 또는 기부</li>
        </StepList>
      </StepSection>
    </>
  );
};

export default MainSection2;
