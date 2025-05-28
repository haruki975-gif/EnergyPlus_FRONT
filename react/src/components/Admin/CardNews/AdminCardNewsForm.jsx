import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminCardNewsForm = () => {
  const navi = useNavigate();

  const [isAuthorized, setIsAuthorized] = useState(null);
  const [formData, setFormData] = useState({
    cardNewsTitle: "",
    cardNewsContent: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const userRole = sessionStorage.getItem("userRole");
    const accessToken = sessionStorage.getItem("accessToken");

    // 로그인하지 않았거나, 관리자 권한이 아닌 경우
    if (!accessToken || userRole !== "ROLE_ADMIN") {
      alert("접근 권한이 없습니다.");
      navi("/");
    } else {
      setIsAuthorized(true);
    }
  }, [navi]);

  if (isAuthorized === null) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("cardNewsTitle", formData.cardNewsTitle);
    data.append("cardNewsContent", formData.cardNewsContent);
    if (file) data.append("file", file);

    try {
      await axios.post("http://localhost:80/admin/cardnews/form", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      alert("카드뉴스 등록 완료!");
      navi("/admin/cardnews");
    } catch (err) {
      console.error(err);
      alert("등록 실패!");
    }
  };

  return (
    <div className="cardnews-container">
      <h1 className="page-title">카드뉴스 등록</h1>
      <form
        className="cardnews-form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label className="label-flex">
          <div>
            제목 <em className="text-danger">*</em>
          </div>
          <input
            type="text"
            name="cardNewsTitle"
            value={formData.cardNewsTitle}
            onChange={handleChange}
            required
          />
        </label>

        <label className="label-flex">
          <div>
            내용 <em className="text-danger">*</em>
          </div>
          <textarea
            name="cardNewsContent"
            value={formData.cardNewsContent}
            onChange={handleChange}
            required
          />
        </label>

        <label className="label-flex">
          <div>
            이미지 <em className="text-danger">*</em>
          </div>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>

        <button type="submit" className="btn cardnews-btn">
          등록하기
        </button>
      </form>
    </div>
  );
};

export default AdminCardNewsForm;
