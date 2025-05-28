import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Wrapper,
  HeaderRow,
  Title,
  BackBtn,
  SearchButton
} from "../TableStyle/Table.style";
import {
  WriteFormWrapper,
  FormSection,
  Label,
  StyledInput,
  StyledTextarea,
  StyledFileInput
} from "../TableStyle/Write.style";

const ChallengeEdit = () => {
  const { challengeSeq } = useParams();
  const navi = useNavigate();

  const [form, setForm] = useState({
    challengeTitle: "",
    challengeContent: ""
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost/challenges/${challengeSeq}`)
      .then(res => {
        setForm({
          challengeTitle: res.data.challengeTitle,
          challengeContent: res.data.challengeContent
        });
      })
      .catch(err => {
        console.error("기존 챌린지 불러오기 실패", err);
        alert("데이터를 불러올 수 없습니다.");
      });
  }, [challengeSeq]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("challengeTitle", form.challengeTitle);
    formData.append("challengeContent", form.challengeContent);
    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.put(`http://localhost/challenges/${challengeSeq}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
        }
      });

      alert("수정 완료되었습니다!");
      navi(`/challenges/${challengeSeq}`);
    } catch (err) {
      console.error("수정 실패", err);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper>
      <HeaderRow>
        <Title>챌린지 수정</Title>
      </HeaderRow>

      <WriteFormWrapper>
        <FormSection>
          <Label>제목</Label>
          <StyledInput
            type="text"
            name="challengeTitle"
            value={form.challengeTitle}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
          />
        </FormSection>

        <FormSection>
          <Label>내용</Label>
          <StyledTextarea
            name="challengeContent"
            value={form.challengeContent}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
          />
        </FormSection>

        <FormSection>
          <Label>첨부 이미지</Label>
          <StyledFileInput type="file" onChange={handleFileChange} />
        </FormSection>
      </WriteFormWrapper>

      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <SearchButton onClick={handleSubmit}>수정 완료</SearchButton>
        <BackBtn onClick={() => navi(-1)}>취소</BackBtn>
      </div>
    </Wrapper>
  );
};

export default ChallengeEdit;
