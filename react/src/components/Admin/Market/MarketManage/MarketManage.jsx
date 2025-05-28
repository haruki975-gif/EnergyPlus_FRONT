import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/admin-market.css";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../AdminSidebar";

const pageSize = 20;

const MarketMange = () => {
  const navigate = useNavigate();
  const [marketList, setMarketList] = useState([]);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(marketList.length / pageSize);
  const startPage = Math.max(0, page - 2);
  const endPage = Math.min(totalPages, startPage + 5);

  const paginatedList = marketList.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    axios
      .get("http://localhost:80/admin/market/list", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMarketList(res.data))
      .catch((err) => {
        console.error("게시글 조회 실패", err);
        alert("게시글을 불러오는 데 실패했습니다.");
      });
  }, []);

  return (
    <>
      <div className="admin-market-container">
        <AdminSidebar />
        <div className="market-list-container">
          <h1>중고거래 게시글 현황</h1>

          <table className="admin-table">
            <thead>
              <tr>
                <th>번호</th>
                <th>게시글 제목</th>
                <th>이름</th>
                <th>날짜</th>
                <th>판매상태</th>
                <th>처리 상태</th>
              </tr>
            </thead>
            <tbody>
              {paginatedList.map((item) => (
                <tr
                  key={item.marketNo}
                  onClick={() =>
                    navigate(`/admin/market/detail/${item.marketNo}`)
                  }
                  className="clickable-row"
                >
                  <td>{item.marketNo}</td>
                  <td>{item.marketTitle}</td>
                  <td>{item.userName}</td>
                  <td>{item.marketDate?.substring(0, 10)}</td>
                  <td>{item.marketStatus === "N" ? "판매중" : "판매완료"}</td>
                  <td>{item.isHidden === "Y" ? "비노출" : "노출"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => setPage(0)} disabled={page === 0}>
              ≪
            </button>
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
            >
              &lt;
            </button>

            {Array.from({ length: endPage - startPage }, (_, i) => (
              <button
                key={startPage + i}
                onClick={() => setPage(startPage + i)}
                className={page === startPage + i ? "active" : ""}
              >
                {startPage + i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
              disabled={page === totalPages - 1}
            >
              &gt;
            </button>
            <button
              onClick={() => setPage(totalPages - 1)}
              disabled={page === totalPages - 1}
            >
              ≫
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketMange;
