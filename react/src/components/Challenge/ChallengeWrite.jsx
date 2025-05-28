import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

const ChallengeWrite = () => {
  const navi = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("editId");

  const [form, setForm] = useState({
    challengeTitle: "",
    challengeContent: ""
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요한 기능입니다.");
      navi("/login");
      return;
    }

    if (editId) {
      axios.get(`http://localhost/challenges/${editId}`)
        .then(res => {
          setForm({
            challengeTitle: res.data.challengeTitle,
            challengeContent: res.data.challengeContent
          });

          const loginUserId = sessionStorage.getItem("userId");
          if (Number(loginUserId) !== res.data.userId) {
            alert("본인 글만 수정할 수 있습니다.");
            navi(-1);
          }
        })
        .catch(err => {
          console.error("수정할 챌린지 불러오기 실패", err);
          alert("글을 불러올 수 없습니다.");
        });
    }
  }, [editId, navi]);

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
    try {
      const formData = new FormData();
      formData.append("challengeTitle", form.challengeTitle);
      formData.append("challengeContent", form.challengeContent);
      if (file) {
        formData.append("file", file);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
        }
      };

      if (editId) {
        await axios.put(`http://localhost/challenges/${editId}`, formData, config);
        alert("수정 완료되었습니다!");
        navi(`/challenges/${editId}`);
      } else {
        await axios.post(`http://localhost/challenges`, formData, config);
        alert("작성 완료되었습니다!");
        navi("/challenges");
      }
    } catch (err) {
      console.error("등록/수정 실패", err);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper>
      <HeaderRow>
        <Title>{editId ? "챌린지 수정" : "챌린지 작성"}</Title>
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
        <SearchButton onClick={handleSubmit}>{editId ? "수정 완료" : "작성 완료"}</SearchButton>
        <BackBtn onClick={() => navi(-1)}>취소</BackBtn>
      </div>
    </Wrapper>
  );
};

export default ChallengeWrite;
