import React from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import "./css/admin-market.css";

const MarketMain = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="admin-container">
        <AdminSidebar />
        <div className="admin-market-container">
          <h1 className="admin-title">중고거래 관리자 대시보드</h1>

          <div className="admin-dashboard-grid">
            <div
              className="admin-card"
              onClick={() => navigate("/admin/market/list")}
            >
              <h2>게시글 관리</h2>
              <p>등록된 중고거래 게시글을 확인하고 관리할 수 있어요.</p>
            </div>

            <div
              className="admin-card"
              onClick={() => navigate("/admin/market/report")}
            >
              <h2>신고 현황</h2>
              <p>신고된 게시글을 확인하고 숨김 처리를 할 수 있어요.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketMain;
