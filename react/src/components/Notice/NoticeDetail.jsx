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
} from "../TableStyle/Table.style";

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const navi     = useNavigate();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost/notices/${noticeId}`)
      .then(res => setNotice(res.data));
  }, [noticeId]);

  if (!notice) return <Wrapper>로딩 중...</Wrapper>;

  return (
    <Wrapper>
      <p style={{ textAlign: "center", marginBottom: 8, color: "#555" }}>
      </p>

      <HeaderRow>
        <Title>공지사항 확인</Title>
      </HeaderRow>

      <ContentDiv>
        <HeaderRow>
          <ContentTitle>{notice.noticeTitle}</ContentTitle>
          <ContentDate>{notice.noticeDate}</ContentDate>
        </HeaderRow>

        <hr />

        <ContentDetail>{notice.noticeContent}</ContentDetail>
      </ContentDiv>

      <BackBtn onClick={() => navi("/notices")}>목록으로</BackBtn>
    </Wrapper>
  );
};

export default NoticeDetail;
