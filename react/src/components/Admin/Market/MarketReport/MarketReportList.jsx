import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../AdminSidebar";
import "../css/admin-market.css";

const MarketReportList = () => {
  const [reportList, setReportList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    axios
      .get("http://localhost:80/admin/market/report/list", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => setReportList(res.data))
      .catch((err) => {
        console.error("신고 목록 불러오기 실패", err);
        alert("신고 목록 조회에 실패했습니다.");
      });
  }, []);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-market-container">
        <h1>중고거래 게시글 신고 현황</h1>
        <table className="admin-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>게시글 제목</th>
              <th>신고 사유</th>
              <th>신고 날짜</th>
              <th>처리 상태</th>
            </tr>
          </thead>
          <tbody>
            {reportList.map((report, index) => (
              <tr key={report.reportId}>
                <td>{index + 1}</td>
                <td
                  className="link"
                  onClick={() =>
                    navigate(`/admin/market/report/${report.reportId}`)
                  }
                  style={{ cursor: "pointer", color: "#007bff" }}
                >
                  {report.marketTitle}
                </td>
                <td>{report.reportReason}</td>
                <td>{report.reportDate?.substring(0, 10)}</td>
                <td>
                  {report.isHidden?.toUpperCase() === "Y"
                    ? "숨김 처리됨"
                    : "미처리"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketReportList;
