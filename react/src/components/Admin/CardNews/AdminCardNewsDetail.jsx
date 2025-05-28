import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import "./css/admin-cardnews.css";

const AdminCardNewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardNews, setCardNews] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    axios
      .get(`http://localhost:80/admin/cardnews/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCardNews(res.data);
      })
      .catch((err) => {
        console.error("카드뉴스 상세 조회 실패:", err);
        alert("카드뉴스 정보를 불러오는 데 실패했습니다.");
      });
  }, [id]);

  // 수정 버튼 클릭 시 수정 페이지로 이동
  const handleEdit = () => {
    navigate(`/admin/cardnews/edit/${id}`);
  };

  // 삭제 버튼 클릭 시 삭제 요청 → 성공 시 목록으로 이동
  const handleDelete = () => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    axios
      .delete(`http://localhost:80/admin/cardnews/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        alert("삭제 완료!");
        navigate("/admin/cardnews");
      })
      .catch((err) => {
        console.error("카드뉴스 삭제 실패:", err);
        alert("삭제 실패");
      });
  };

  if (!cardNews) return <div>로딩 중...</div>;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-cardnews-container">
        <h1>카드뉴스 상세정보</h1>
        <p>
          <strong>제목:</strong> {cardNews.cardNewsTitle}
        </p>
        <p>
          <strong>내용:</strong> {cardNews.cardNewsContent}
        </p>
        {cardNews.cardNewsImgUrl && (
          <div className="admin-cardnews-image">
            <img
              src={`http://localhost:80${cardNews.cardNewsImgUrl}`}
              alt="카드뉴스 이미지"
            />
          </div>
        )}
        <p>
          <strong>등록일:</strong> {cardNews.cardNewsDate?.substring(0, 10)}
        </p>

        <div className="btn-group">
          <button className="btn btn-edit" onClick={handleEdit}>
            수정
          </button>
          <button className="btn btn-delete" onClick={handleDelete}>
            삭제
          </button>
          <button className="btn btn-back" onClick={() => navigate(-1)}>
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCardNewsDetail;
