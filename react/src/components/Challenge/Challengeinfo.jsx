import React from "react";
import { Wrapper, Title } from "../TableStyle/Table.style";

const ChallengeInfo = () => {
  return (
    <Wrapper>
      <Title>챌린지 안내</Title>

      <section style={{ marginTop: "2rem", lineHeight: "1.8" }}>
        {/* 소개 카드 */}
        <div style={{
          backgroundColor: "#f9f9f9",
          padding: "2rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
        }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>📢 에너지생활+ 챌린지란?</h2>
          <ul>
            <li>에너지생활+의 챌린지 게시판은 탄소중립을 실천하는 다양한 활동을 자유롭게 등록하고,</li>
            <li>인증을 통해 마일리지를 받을 수 있는 공간입니다.</li>
            <li>작은 행동 하나도 쌓이면 큰 변화를 만들어냅니다.</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: "#f9f9f9",
          padding: "2rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
        }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>🌱 챌린지 참여 방법</h2>
          <ol>
            <li>친환경 행동은 자유롭게 정할 수 있습니다.</li>
            <li>인증 사진을 첨부하고 간단한 설명을 작성해요.</li>
            <li>관리자의 승인 후 마일리지가 지급됩니다.</li>
          </ol>
        </div>

        <div style={{
          backgroundColor: "#f9f9f9",
          padding: "2rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
        }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>🎁 마일리지 지급 기준</h2>
          <ul>
            <li>인증 내용이 명확하고 구체적일수록 높은 포인트가 지급됩니다.</li>
            <li>중복된 내용은 지급 대상에서 제외될 수 있습니다.</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: "rgba(255, 238, 238, 0.49)",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
        }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>📌 유의사항</h2>
          <ul>
            <li>허위 인증 시 제재를 받을 수 있습니다.</li>
            <li>사진은 본인이 직접 실천한 것을 기반으로 작성해야 합니다.</li>
          </ul>
        </div>
      </section>
    </Wrapper>
  );
};

export default ChallengeInfo;
