import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import {
  Wrapper,
  HeaderRow,
  Title,
  StyledTable,
  BackBtn,
  SearchBox,
  SearchInput,
  SearchButton,
  Pagination,
  PageBtn
} from "../../TableStyle/Table.style";

const AdminChallenges = () => {
  const [participations, setParticipations] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const size = 10;
  const totalPages = Math.ceil(totalCount / size);
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost/admin/challenges", {
      params: { page, keyword: searchKeyword },
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setParticipations(res.data))
      .catch(err => {
        console.error("❌ 챌린지 참여 목록 실패:", err);
        setParticipations([]);
      });

    axios.get("http://localhost/admin/challenges/pages", {
      params: { keyword: searchKeyword },
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTotalCount(res.data * size))
      .catch(err => {
        console.error("❌ 페이지 수 불러오기 실패:", err);
        setTotalCount(0);
      });
  }, [page, searchKeyword]);

  const handleSearch = () => {
    setPage(0);
    setSearchKeyword(keyword);
  };

  const resetSearch = () => {
    setKeyword("");
    setSearchKeyword("");
    setPage(0);
  };

  const blockSize = 5;
  const blockIndex = Math.floor(page / blockSize);
  const startPage = blockIndex * blockSize;
  const endPage = Math.min(startPage + blockSize, totalPages);

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <Wrapper style={{ flex: 1 }}>
        <HeaderRow>
          <Title>🏁 챌린지 참여 내역</Title>
          <SearchBox>
            <SearchInput
              placeholder="제목 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
            {keyword && <SearchButton onClick={resetSearch}>초기화</SearchButton>}
          </SearchBox>
        </HeaderRow>

        <StyledTable>
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
              <th>상태</th>
              <th>마일리지</th>
            </tr>
          </thead>
          <tbody>
            {participations.length > 0 ? (
              participations.map((p, idx) => (
                <tr key={p.challengeSeq}>
                  <td>{page * size + idx + 1}</td>
                  <td onClick={() => navigate(`/admin/challenges/${p.challengeSeq}`)} style={{ cursor: "pointer" }}>
                    {p.challengeTitle}</td>
                  <td>{p.userName}</td>
                  <td>{p.challengeStatus === "N" ? "대기" : p.challengeStatus === "Y" ? "승인" : "반려"}</td>
                  <td>{p.mileageRewarded || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                  등록된 챌린지 참여 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </StyledTable>

        <Pagination>
          <PageBtn onClick={() => setPage(0)} disabled={page === 0}>≪</PageBtn>
          <PageBtn onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}>{"<"}</PageBtn>

          {Array.from({ length: endPage - startPage }, (_, i) => (
            <PageBtn
              key={startPage + i}
              onClick={() => setPage(startPage + i)}
              active={page === startPage + i}
            >
              {startPage + i + 1}
            </PageBtn>
          ))}

          <PageBtn onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))} disabled={page === totalPages - 1}>{">"}</PageBtn>
          <PageBtn onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}>≫</PageBtn>
        </Pagination>

        <BackBtn onClick={() => navigate(-1)}>뒤로가기</BackBtn>
      </Wrapper>
    </div>
  );
};

export default AdminChallenges;
