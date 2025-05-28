import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Wrapper,
  HeaderRow,
  Title,
  SearchBox,
  SearchButton,
  DeleteButton,
  ContentDiv,
  ContentTitle,
  ContentDate,
  ContentDetail,
  BackBtn
} from "../../TableStyle/Table.style";
import AdminSidebar from "../AdminSidebar";

const AdminChallengeDetail = () => {
  const { challengeSeq } = useParams();
  const navi = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  const [challenge, setChallenge] = useState(null);
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showApproveInput, setShowApproveInput] = useState(false);
  const [mileage, setMileage] = useState("");



  const fetchDetail = async () => {
    try {
      const res = await axios.get(`http://localhost/admin/challenges/${challengeSeq}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChallenge(res.data);
    } catch (err) {
      console.error("❌ 챌린지 상세 불러오기 실패", err);
      alert("챌린지를 불러올 수 없습니다.");
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [challengeSeq, token]);

  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost/admin/challenges/${challengeSeq}/approve`,
        {
          mileage: Number(mileage)
        }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("승인 처리되었습니다.");
      navi(-1);
    } catch (err) {
      console.error("승인 실패", err);
      alert("승인 처리 중 오류가 발생했습니다.");
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("반려 사유를 입력해주세요.");
      return;
    }
  
    try {
      await axios.put(
        `http://localhost/admin/challenges/${challengeSeq}/reject`,
        { rejectReason },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("반려 처리되었습니다.");
      setRejectReason("");
      setShowRejectInput(false);
      fetchDetail();  // 다시 불러오기
    } catch (err) {
      console.error("반려 실패", err);
      alert("반려 처리 중 오류가 발생했습니다.");
    }
  };

  if (!challenge) return <Wrapper>로딩 중...</Wrapper>;

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <Wrapper style={{ flex: 1 }}>
        

        <HeaderRow>
          <Title>🏁 관리자 챌린지 확인</Title>
        </HeaderRow>

        <ContentDiv>
          <HeaderRow>
            <ContentTitle>{challenge.challengeTitle}</ContentTitle>
            <ContentDate>{challenge.rewardedDate ? new Date(challenge.rewardedDate).toLocaleDateString() : ""}</ContentDate>
          </HeaderRow>

          <hr />
          <ContentDetail>{challenge.challengeContent}</ContentDetail>
          {challenge.mileageRewarded && (
            <p style={{ marginTop: "1rem", color: "#444" }}>💰 지급 마일리지: {challenge.mileageRewarded}</p>
          )}
          {challenge.rejectReason && (
            <p style={{ marginTop: "1rem", color: "tomato" }}>❗ 반려 사유: {challenge.rejectReason}</p>
          )}

          {challenge.challengeImg && (
            <div style={{ marginTop: "1rem" }}>
              <img
                src={`http://localhost:${challenge.challengeImg}`}
                alt="인증 이미지"
                style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
              />
            </div>
          )}
        </ContentDiv>
            <br />
            {showRejectInput && (
                <div style={{ marginTop: "1rem" }}>
                    <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="반려 사유를 입력하세요"
                    style={{ width: "100%", height: "80px", padding: "0.5rem" }}
                    />
                    <div style={{ marginTop: "0.5rem" }}>
                    <SearchButton onClick={handleReject}>반려 처리</SearchButton>
                    <DeleteButton onClick={() => setShowRejectInput(false)}>취소</DeleteButton>
                    </div>
                </div>
                )}

          {showApproveInput && (
            <div style={{ marginTop: "1rem" }}>
              <input
                type="number"
                placeholder="지급할 마일리지를 입력하세요"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                style={{ padding: "0.5rem", width: "100%" }}
              />
              <div style={{ marginTop: "0.5rem" }}>
                <SearchButton onClick={handleApprove}>지급</SearchButton>
                <DeleteButton onClick={() => setShowApproveInput(false)}>취소</DeleteButton>
              </div>
            </div>
          )}

            <br/>
          <SearchBox>
            <SearchButton onClick={() => setShowApproveInput(true)}>승인</SearchButton>
            <DeleteButton onClick={() => setShowRejectInput(true)}>반려</DeleteButton>
          </SearchBox>

          <BackBtn onClick={() => navi("/admin/challenges")}>목록으로</BackBtn>
      </Wrapper>

    </div>
  );
};

export default AdminChallengeDetail;
