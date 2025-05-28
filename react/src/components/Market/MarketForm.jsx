import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/market.css";

const MarketForm = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    marketTitle: "",
    marketContent: "",
    marketPrice: "",
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (images.length !== 3 || images.includes(undefined)) {
      alert("이미지는 3장을 모두 등록해야 합니다.");
      return;
    }

    const form = new FormData();
    form.append("marketTitle", formData.marketTitle);
    form.append("marketContent", formData.marketContent);
    form.append("marketPrice", formData.marketPrice);

    images.forEach((img) => {
      if (img) form.append("images", img);
    });

    axios
      .post("http://localhost:80/markets/write", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert("등록 완료되었습니다.");
        navigate(`/markets/${res.data.marketNo}`);
      })
      .catch((err) => {
        console.error(err);
        alert("등록 실패되었습니다.");
      });
  };

  return (
    <div className="market-container">
      <h1 className="page-title">중고거래 등록</h1>
      <form
        onSubmit={handleSubmit}
        className="market-form"
        encType="multipart/form-data"
      >
        <label className="label-flex">
          <div>
            제목 <em className="text-danger">*</em>
          </div>
          <input
            type="text"
            name="marketTitle"
            value={formData.marketTitle}
            onChange={handleChange}
            required
          />
        </label>

        <label className="label-flex">
          <div>
            가격 <em className="text-danger">*</em>
          </div>
          <input
            type="number"
            name="marketPrice"
            value={formData.marketPrice}
            onChange={handleChange}
            required
          />
        </label>

        <label className="label-flex">
          <div>
            내용 <em className="text-danger">*</em>
          </div>
          <textarea
            name="marketContent"
            value={formData.marketContent}
            onChange={handleChange}
            required
          />
        </label>

        {[0, 1, 2].map((i) => (
          <label key={i} className="label-flex">
            <div>
              {i === 0 ? "썸네일" : `${i}번째 상세 이미지`}{" "}
              <em className="text-danger">*</em>
            </div>
            <input
              type="file"
              name={`image-${i}`}
              accept="image/*"
              onChange={(e) => handleImageChange(e, i)}
              required
            />
          </label>
        ))}

        <button type="submit" className="btn market-btn">
          등록하기
        </button>
      </form>
    </div>
  );
};

export default MarketForm;
