import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../AdminSidebar";
import "../css/admin-market.css";

const MarketReportDetail = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    axios
      .get(`http://localhost:80/admin/market/report/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setReport(res.data))
      .catch((err) => {
        console.error("신고 상세 조회 실패", err);
        alert("신고 정보를 불러오는 데 실패했습니다.");
      });
  }, [reportId]);

  const handleToggleHide = () => {
    const token = sessionStorage.getItem("accessToken");
    const action = report.isHidden === "Y" ? "숨김 해제" : "숨김 처리";

    if (!window.confirm(`정말 ${action} 하시겠습니까?`)) return;

    axios
      .put(
        `http://localhost:80/admin/market/report/hide/${report.reportId}/${report.marketNo}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert(`${action} 완료되었습니다.`);
        setReport({ ...report, isHidden: report.isHidden === "Y" ? "N" : "Y" });
      })
      .catch((err) => {
        console.error(`${action} 실패`, err);
        alert(`${action}에 실패했습니다.`);
      });
  };

  if (!report) return <p>로딩 중...</p>;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-market-container">
        <h1>신고 상세 정보</h1>

        <p>
          <strong>처리 상태:</strong>{" "}
          {report.isHidden === "Y" ? "숨김 처리 완료" : "미처리"}
        </p>
        <p>
          <strong>신고번호:</strong> {report.reportId}
        </p>
        <p>
          <strong>게시글 번호:</strong> {report.marketNo}
        </p>
        <p>
          <strong>게시글 제목:</strong> {report.marketTitle}
        </p>
        <p>
          <strong>신고 사유:</strong> {report.reportReason}
        </p>
        <p>
          <strong>신고 날짜:</strong> {report.reportDate?.substring(0, 10)}
        </p>
        <p>
          <strong>총 신고 횟수:</strong> {report.totalReportCount}회
        </p>

        <p>
          <strong>게시글 내용:</strong>
        </p>
        <p className="report-market-content">{report.marketContent}</p>

        <a
          href={`/markets/${report.marketNo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          게시글로 이동
        </a>

        <div className="btn-group">
          <button
            className={`btn ${
              report.isHidden === "Y" ? "btn-show" : "btn-hide"
            }`}
            onClick={handleToggleHide}
          >
            {report.isHidden === "Y" ? "숨김 해제" : "숨김 처리"}
          </button>
          <button
            className="btn"
            onClick={() => navigate("/admin/market/report")}
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketReportDetail;
