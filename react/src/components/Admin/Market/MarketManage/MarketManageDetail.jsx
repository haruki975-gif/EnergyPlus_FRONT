import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/admin-market.css";
import AdminSidebar from "../../AdminSidebar";

const MarketManageDetail = () => {
  const { marketNo } = useParams();
  const navigate = useNavigate();
  const [market, setMarket] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    axios
      .get(`http://localhost:80/admin/market/detail/${marketNo}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMarket(res.data))
      .catch((err) => {
        console.error("상세 조회 실패", err);
        alert("상세 정보를 불러오는 데 실패했습니다.");
      });
  }, [marketNo]);

  const handleToggleHide = () => {
    const token = sessionStorage.getItem("accessToken");
    const action = market.isHidden === "Y" ? "숨김 해제" : "숨김 처리";

    if (!window.confirm(`정말 ${action} 하시겠습니까?`)) return;

    axios
      .put(`http://localhost:80/admin/market/hide/${market.marketNo}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`${action} 완료되었습니다.`);
        setMarket({ ...market, isHidden: market.isHidden === "Y" ? "N" : "Y" });
      })
      .catch((err) => {
        console.error(`${action} 실패`, err);
        alert(`${action}에 실패했습니다.`);
      });
  };

  if (!market) return <p>로딩 중...</p>;

  return (
    <div className="admin-market-container">
      <AdminSidebar />
      <div className="market-detail-container">
        <h2>{market.marketTitle}</h2>

        <p>
          <strong>작성자:</strong> {market.userName}
        </p>
        <p>
          <strong>내용:</strong> {market.marketContent}
        </p>
        <p>
          <strong>가격:</strong> {market.marketPrice?.toLocaleString()}원
        </p>
        <p>
          <strong>날짜:</strong> {market.marketDate?.substring(0, 10)}
        </p>
        <p>
          <strong>판매 상태:</strong>{" "}
          {market.marketStatus === "N" ? "판매중" : "판매완료"}
        </p>
        <p>
          <strong>처리 상태:</strong>{" "}
          {market.isHidden === "Y" ? "비노출" : "노출"}
        </p>

        {/* 이미지 갤러리 */}
        {market.imageList && market.imageList.length > 0 && (
          <div className="image-gallery">
            {market.imageList.map((img, idx) => (
              <img
                key={idx}
                src={`http://localhost:80${img.imgUrl}`}
                alt={`image-${idx}`}
                className="market-thumbnail"
              />
            ))}
          </div>
        )}

        <div className="btn-group">
          <button
            className={`btn ${
              market.isHidden === "Y" ? "btn-show" : "btn-hide"
            }`}
            onClick={handleToggleHide}
          >
            {market.isHidden === "Y" ? "숨김 해제" : "숨김 처리"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketManageDetail;
