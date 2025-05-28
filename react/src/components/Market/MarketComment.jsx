import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MarketComment = ({ marketNo }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("userId");

  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyTargetCommentNo, setReplyTargetCommentNo] = useState(null);
  const [editingReplyNo, setEditingReplyNo] = useState(null);
  const [editingReplyContent, setEditingReplyContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, [marketNo]);

  const fetchComments = async () => {
    try {
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {};
      const res = await axios.get(
        `http://localhost:80/markets/comments/${marketNo}`,
        config
      );
      setComments(res.data);

      const replyResults = await Promise.all(
        res.data.map((comment) =>
          axios.get(
            `http://localhost:80/markets/reply/${comment.marketCommentNo}`,
            config
          )
        )
      );
      setReplies(replyResults.flatMap((r) => r.data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!token) return navigate("/login");

    try {
      await axios.post(
        "http://localhost:80/markets/comments",
        { marketNo, marketCommentContent: commentContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentContent("");
      fetchComments();
    } catch (err) {
      console.error(err);
      alert("댓글 등록 실패");
    }
  };

  const handleCommentUpdate = async (commentId) => {
    try {
      await axios.put(
        "http://localhost:80/markets/comments",
        { marketCommentNo: commentId, marketCommentContent: editingContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingCommentId(null);
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:80/markets/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplySubmit = async (e, commentNo) => {
    e.preventDefault();
    if (!token) return navigate("/login");

    try {
      await axios.post(
        "http://localhost:80/markets/reply/write",
        { replyContent, marketCommentNo: commentNo },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReplyContent("");
      setReplyTargetCommentNo(null);
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplyUpdate = async (replyNo) => {
    try {
      await axios.put(
        "http://localhost:80/markets/reply/update",
        { replyNo, replyContent: editingReplyContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingReplyNo(null);
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplyDelete = async (replyNo) => {
    try {
      await axios.delete(`http://localhost:80/markets/reply/${replyNo}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentReport = async (commentNo) => {
    const reason = prompt("댓글 신고 사유를 입력하세요:");
    if (!reason || !userId) return;
    try {
      await axios.post(
        "http://localhost:80/markets/commentReport",
        {
          marketCommentNo: commentNo,
          commentReportReason: reason,
          reporterUserId: userId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("신고 완료");
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplyReport = async (replyNo) => {
    const reason = prompt("답글 신고 사유를 입력하세요:");
    if (!reason || !userId) return;
    try {
      await axios.post(
        "http://localhost:80/markets/replyReport",
        { replyNo, replyReportReason: reason, reporterUserId: userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("신고 완료");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="comment-section">
      <h3>댓글</h3>
      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <div className="comment-form-field">
          <textarea
            className="comment-input"
            placeholder="댓글을 입력하세요"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button type="submit" className="btn market-btn submit-btn">
            등록
          </button>
        </div>
      </form>

      <ul className="comment-list">
        {comments.map((c) => (
          <li key={c.marketCommentNo} className="comment-item">
            <div className="comment-meta">
              <div className="comment-meta-left">
                <span className="comment-writer">
                  {c.userName || "탈퇴한 사용자"}
                </span>
                <em className="line">|</em>
                <span className="comment-date">
                  {new Date(c.marketCommentDate).toLocaleDateString("ko-KR")}
                </span>
              </div>
              {!c.isMine && (
                <button
                  className="btn btn-danger btn-no-line"
                  onClick={() => handleCommentReport(c.marketCommentNo)}
                >
                  신고
                </button>
              )}
            </div>

            <div className="comment-content-wrap">
              {editingCommentId === c.marketCommentNo ? (
                <div className="edit-form">
                  <textarea
                    className="comment-input"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <div className="btn-wrap">
                    <button
                      className="btn-sm"
                      onClick={() => handleCommentUpdate(c.marketCommentNo)}
                    >
                      저장
                    </button>
                    <button
                      className="btn-sm"
                      onClick={() => setEditingCommentId(null)}
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="comment-content">{c.marketCommentContent}</p>
                  <div className="btn-wrap">
                    {c.isMine && (
                      <>
                        <button
                          className="btn-sm"
                          onClick={() => {
                            setEditingCommentId(c.marketCommentNo);
                            setEditingContent(c.marketCommentContent);
                          }}
                        >
                          수정
                        </button>
                        <button
                          className="btn-sm"
                          onClick={() => handleCommentDelete(c.marketCommentNo)}
                        >
                          삭제
                        </button>
                      </>
                    )}
                    <button
                      className="btn-sm"
                      onClick={() => setReplyTargetCommentNo(c.marketCommentNo)}
                    >
                      답글
                    </button>
                  </div>
                </>
              )}

              {replyTargetCommentNo === c.marketCommentNo && (
                <form
                  className="reply-form"
                  onSubmit={(e) => handleReplySubmit(e, c.marketCommentNo)}
                >
                  <MdOutlineSubdirectoryArrowRight />
                  <div className="reply-form-right">
                    <textarea
                      className="reply-input"
                      placeholder="답글을 입력하세요"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                    />
                    <button className="btn market-btn">답글 등록</button>
                  </div>
                </form>
              )}

              <ul className="reply-list">
                {replies
                  .filter((r) => r.marketCommentNo === c.marketCommentNo)
                  .map((r) => (
                    <li key={r.replyNo} className="reply-item">
                      <div className="reply-item-left">
                        <MdOutlineSubdirectoryArrowRight />
                      </div>
                      <div className="reply-item-right">
                        <div className="reply-meta">
                          <div className="reply-meta-left">
                            <span className="reply-writer">
                              {r.userName || "탈퇴한 사용자"}
                            </span>
                            <em className="line">|</em>
                            <span className="reply-date">
                              {new Date(r.replyDate).toLocaleDateString(
                                "ko-KR"
                              )}
                            </span>
                          </div>
                          {!r.isMine && (
                            <button
                              className="btn btn-danger btn-no-line"
                              onClick={() => handleReplyReport(r.replyNo)}
                            >
                              신고
                            </button>
                          )}
                        </div>
                        <div className="reply-content-wrap">
                          {editingReplyNo === r.replyNo ? (
                            <>
                              <input
                                value={editingReplyContent}
                                onChange={(e) =>
                                  setEditingReplyContent(e.target.value)
                                }
                              />
                              <div className="btn-wrap">
                                <button
                                  className="btn-sm"
                                  onClick={() => handleReplyUpdate(r.replyNo)}
                                >
                                  저장
                                </button>
                                <button
                                  className="btn-sm"
                                  onClick={() => setEditingReplyNo(null)}
                                >
                                  취소
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="reply-content">{r.replyContent}</p>
                              {r.isMine && (
                                <div className="reply-btn-wrap">
                                  <button
                                    className="btn-sm"
                                    onClick={() => {
                                      setEditingReplyNo(r.replyNo);
                                      setEditingReplyContent(r.replyContent);
                                    }}
                                  >
                                    수정
                                  </button>
                                  <button
                                    className="btn-sm"
                                    onClick={() => handleReplyDelete(r.replyNo)}
                                  >
                                    삭제
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketComment;
