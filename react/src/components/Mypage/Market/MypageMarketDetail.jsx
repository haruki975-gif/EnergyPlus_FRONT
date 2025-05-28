import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Market/css/market.css";
import defaultImg from "../../../assets/img/default.jpg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MypageComment from "./MypageComment";

const MypageMarketDetail = () => {

  const navi = useNavigate();
  const { marketNo } = useParams();
  const [market, setMarket] = useState(null);
  const [comments, setComments] = useState([]);

  // 상세 조회
  useEffect(() => {
    if (!marketNo) return; // marketNo가 있을 때만 요청

    axios.get(`http://localhost/mymarket/${marketNo}`)
      .then((res) => setMarket(res.data))
      .catch((err) => console.error(err));
  }, [marketNo]);

  // 댓글 조회
  useEffect(() => {
    if (!marketNo) return; // marketNo가 있을 때만 요청

    axios.get(`http://localhost/markets/comments/${marketNo}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error(err));
  }, [marketNo]);

  if (!market) return <p>로딩중...</p>;


  return (
    <>
      <div className="market-container">
        <h1 className="page-title">나의 중고거래 글 상세</h1>

        <div className="market-detail-content-wrap">
          <div className="market-detail-content">
            <div className="market-detail-content-left">
              <img
                src={
                  market.imageList?.[0]
                    ? `http://localhost${market.imageList[0].imgUrl}`
                    : defaultImg
                }
                alt="썸네일"
                className="market-thumbnail"
              />
            </div>

            <div className="market-detail-content-right">
              <div className="market-detail-top">
                <span className="market-detail-status">
                  {market.marketStatusLabel}
                </span>
                <h2 className="market-title">{market.marketTitle}</h2>
              </div>

              <div className="market-detail-bottom">
                <div className="market-detail-meta">
                  <span className="market-writer">{market.userName || "판매자"}</span>
                  <em>|</em>
                  <span className="market-date">
                    {new Date(market.marketDate).toLocaleDateString("ko-KR")}
                  </span>
                </div>

                <p className="market-price">
                  {market.marketPrice?.toLocaleString()}원
                </p>

                <p className="market-content-text">{market.marketContent}</p>
              </div>
            </div>
          </div>

          <div className="market-detail-content-img">
            {[0, 1, 2].map((i) => (
              <img
                key={i}
                src={
                  market.imageList?.[i]
                    ? `http://localhost${market.imageList[i].imgUrl}`
                    : defaultImg
                }
                alt={`상세 이미지 ${i}`}
              />
            ))}
          </div>
        </div>

        <div className="market-detail-buttons">
        <button className="btn market-btn" onClick={() => navi(`/markets/edit/${market.marketNo}`)}>
            수정하기
          </button>
          <button className="btn market-btn" onClick={() => navi("/mypage_market")}>
            목록으로
          </button>
        </div>

        {/* 댓글/대댓글 컴포넌트 */}
        <MypageComment marketNo={marketNo} />

      </div>
    </>
  );
};

export default MypageMarketDetail;