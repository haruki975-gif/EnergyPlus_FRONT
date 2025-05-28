import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Wrapper,
  HeaderRow,
  Title,
  BackBtn,
  SearchButton
} from "../../TableStyle/Table.style";
import {
  WriteFormWrapper,
  FormSection,
  Label,
  StyledInput,
  StyledTextarea
} from "../../TableStyle/Write.style";

const AdminNoticeEdit = () => {
  const { noticeId } = useParams();
  const navi = useNavigate();
  const token = sessionStorage.getItem("accessToken");

  const [form, setForm] = useState({
    noticeTitle: "",
    noticeContent: ""
  });

  useEffect(() => {
    axios.get(`http://localhost/admin/notices/${noticeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setForm({
          noticeTitle: res.data.noticeTitle,
          noticeContent: res.data.noticeContent
        });
      })
      .catch(err => {
        console.error("기존 공지사항 불러오기 실패", err);
        alert("데이터를 불러올 수 없습니다.");
      });
  }, [noticeId, token]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost/admin/notices/${noticeId}`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("수정 완료되었습니다!");
      navi("/admin/notices");
    } catch (err) {
      console.error("수정 실패", err);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper>
      <HeaderRow>
        <Title>📢 공지사항 수정 </Title>
      </HeaderRow>

      <WriteFormWrapper>
        <FormSection>
          <Label>제목</Label>
          <StyledInput
            type="text"
            name="noticeTitle"
            value={form.noticeTitle}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />
        </FormSection>

        <FormSection>
          <Label>내용</Label>
          <StyledTextarea
            name="noticeContent"
            value={form.noticeContent}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
          />
        </FormSection>
      </WriteFormWrapper>

      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <SearchButton onClick={handleSubmit}>수정 완료</SearchButton>
        <BackBtn onClick={() => navi(-1)}>취소</BackBtn>
      </div>
    </Wrapper>
  );
};

export default AdminNoticeEdit;