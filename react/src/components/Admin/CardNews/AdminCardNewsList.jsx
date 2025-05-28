import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/admin-cardnews.css";
import AdminSidebar from "../AdminSidebar";

const AdminCardNewsList = () => {
  const [cardNewsList, setCardNewsList] = useState([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const navigate = useNavigate();

  const fetchCardNewsList = (pageNo) => {
    axios
      .get(`http://localhost:80/admin/cardnews/list?page=${pageNo}`)
      .then((res) => {
        setCardNewsList(res.data);
        setPage(pageNo);
        // 다음 페이지가 없으면 false 처리 (예시: 6개 미만이면 마지막 페이지로 가정)
        setHasNext(res.data.length === 6);
      })
      .catch((err) => {
        console.error(err);
        alert("카드뉴스 목록을 불러오지 못했습니다.");
      });
  };

  useEffect(() => {
    fetchCardNewsList(0); // 첫 페이지로 시작
  }, []);

  const goToDetail = (id) => {
    navigate(`/admin/cardnews/detail/${id}`);
  };

  const handleDelete = (id) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:80/admin/cardnews/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          alert("삭제 완료!");
          fetchCardNewsList(page); // 현재 페이지 다시 조회
        })
        .catch((err) => {
          console.error(err);
          alert("삭제에 실패했습니다.");
        });
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      fetchCardNewsList(page - 1);
    }
  };
  const handleWrite = () => {
    navigate("/cardnews_form");
  };
  const handleNext = () => {
    if (hasNext) {
      fetchCardNewsList(page + 1);
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-cardnews-container">
        <h1>관리자 카드뉴스 목록</h1>
        <div className="btn-wrap">
          <button className="admin-btn btn" onClick={handleWrite}>
            글쓰기
          </button>
        </div>
        <table className="admin-cardnews-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>등록일</th>
              <th>상세</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {cardNewsList.map((item, index) => (
              <tr key={item.cardNewsNo}>
                <td>{page * 6 + index + 1}</td>
                <td>{item.cardNewsTitle}</td>
                <td>{item.cardNewsDate?.substring(0, 10)}</td>
                <td>
                  <button
                    className="admin-btn btn"
                    onClick={() => goToDetail(item.cardNewsNo)}
                  >
                    보기
                  </button>
                </td>
                <td>
                  <button
                    className="admin-btn btn"
                    onClick={() => handleDelete(item.cardNewsNo)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrev} disabled={page === 0}>
            이전
          </button>
          <span>{page + 1} 페이지</span>
          <button onClick={handleNext} disabled={!hasNext}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCardNewsList;
