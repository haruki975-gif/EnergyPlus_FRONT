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

const AdminNoticeDetail = () => {
  const { noticeId } = useParams();
  const navi = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost/admin/notices/${noticeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setNotice(res.data))
      .catch(err => {
        console.error("❌ 공지사항 상세 불러오기 실패", err);
        alert("공지사항을 불러올 수 없습니다.");
      });
  }, [noticeId, token]);

  const handleEdit = () => navi(`/admin/notices/${noticeId}/edit`);
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`http://localhost/admin/notices/${noticeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("삭제가 완료되었습니다.");
      navi("/admin/notices");
    } catch (err) {
      console.error("❌ 삭제 실패", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  if (!notice) return <Wrapper>로딩 중...</Wrapper>;

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <Wrapper style={{ flex: 1 }}>
        <p style={{ textAlign: "center", marginBottom: 8, color: "#555" }}>
          공지사항 번호: {noticeId}
        </p>

        <HeaderRow>
          <Title>📢 관리자 공지사항 확인</Title>
          <SearchBox>
            <SearchButton onClick={handleEdit}>글 수정</SearchButton>
            <DeleteButton onClick={handleDelete}>글 삭제</DeleteButton>
          </SearchBox>
        </HeaderRow>

        <ContentDiv>
          <HeaderRow>
            <ContentTitle>{notice.noticeTitle}</ContentTitle>
            <ContentDate>{notice.noticeDate}</ContentDate>
          </HeaderRow>

          <hr />
          <ContentDetail>{notice.noticeContent}</ContentDetail>
        </ContentDiv>

        <BackBtn onClick={() => navi("/admin/notices")}>목록으로</BackBtn>
      </Wrapper>
    </div>
  );
};

export default AdminNoticeDetail;