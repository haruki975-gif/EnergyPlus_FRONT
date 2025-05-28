import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import {
  Wrapper,
  HeaderRow,
  Title,
  SearchButton
} from '../../TableStyle/Table.style';

import {
  WriteFormWrapper,
  FormSection,
  Label,
  StyledInput,
  StyledTextarea
} from '../../TableStyle/Write.style';

import AdminSidebar from '../AdminSidebar';

const AdminNoticeWrite = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");

  const [form, setForm] = useState({
    noticeTitle: '',
    noticeContent: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost/admin/notices', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("공지사항이 등록되었습니다.");
      navigate('/admin/notices');
    } catch (err) {
      alert('공지사항 등록에 실패했습니다.');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <AdminSidebar />

      <Wrapper style={{ flex: 1 }}>
        <HeaderRow>
          <Title>📢 관리자 공지사항 작성</Title>
        </HeaderRow>

        <form onSubmit={handleSubmit}>
          <WriteFormWrapper>
            <FormSection>
              <Label>제목</Label>
              <StyledInput
                name="noticeTitle"
                value={form.noticeTitle}
                onChange={handleChange}
                placeholder="제목을 입력하세요"
                required
              />
            </FormSection>

            <FormSection>
              <Label>내용</Label>
              <StyledTextarea
                name="noticeContent"
                value={form.noticeContent}
                onChange={handleChange}
                placeholder="내용을 입력하세요"
                required
              />
            </FormSection>

            <SearchButton type="submit">등록</SearchButton>
          </WriteFormWrapper>
        </form>
      </Wrapper>
    </div>
  );
};

export default AdminNoticeWrite;

