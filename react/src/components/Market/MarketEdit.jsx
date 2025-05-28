import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./css/market.css";

const MarketEdit = () => {
  const { marketNo } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    marketTitle: "",
    marketContent: "",
    marketPrice: "",
    marketStatus: "N",
  });
  const [images, setImages] = useState([null, null, null]);
  const [existingImages, setExistingImages] = useState([null, null, null]);
  const [deletedImages, setDeletedImages] = useState([false, false, false]);

  useEffect(() => {
    axios
      .get(`http://localhost:80/markets/${marketNo}`)
      .then((res) => {
        const {
          marketTitle,
          marketContent,
          marketPrice,
          marketStatus,
          imageList,
        } = res.data;
        setFormData({ marketTitle, marketContent, marketPrice, marketStatus });
        //  3개만 고정해서 저장
        const trimmedImages = (imageList || []).slice(0, 3);
        while (trimmedImages.length < 3) {
          trimmedImages.push(null); // 부족하면 null로 채움
        }
        setExistingImages(trimmedImages);
      })
      .catch((err) => console.error(err));
  }, [marketNo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];

    const newImages = [...images];
    newImages[index] = file;
    setImages([...newImages]);

    const newExistingImages = [...existingImages];
    newExistingImages[index] = null;
    setExistingImages([...newExistingImages]);

    const newDeleted = [...deletedImages];
    newDeleted[index] = true;
    setDeletedImages([...newDeleted]);

    console.log("[handleImageChange] images:", newImages);
    console.log("[handleImageChange] existingImages:", newExistingImages);
    console.log("[handleImageChange] deletedImages:", newDeleted);
  };

  const handleDeleteImage = (index) => {
    const newDeleted = [...deletedImages];
    newDeleted[index] = true;
    setDeletedImages(newDeleted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalImages = [null, null, null];

    existingImages.forEach((img, idx) => {
      if (!deletedImages[idx] && img) {
        finalImages[idx] = img.imgUrl; // idx에 맞게 넣음
      }
    });

    images.forEach((img, idx) => {
      if (img) {
        finalImages[idx] = img; // idx에 맞게 덮어쓰기
      }
    });

    console.log("== 최종 검증용 ==");
    console.log("finalImages:", finalImages);
    console.log(
      "validFinalImages.length:",
      finalImages.filter((item) => item !== null).length
    );

    const totalValidCount = finalImages.filter((item) => item !== null).length;
    if (totalValidCount !== 3) {
      alert("수정 시 이미지는 총 3장이 있어야 합니다.");
      return;
    }

    const form = new FormData();
    form.append("marketNo", marketNo);
    form.append("marketTitle", formData.marketTitle);
    form.append("marketContent", formData.marketContent);
    form.append("marketPrice", formData.marketPrice);
    form.append("marketStatus", formData.marketStatus);

    finalImages.forEach((item) => {
      if (typeof item === "string") {
        form.append("keepImageUrls", item);
      } else if (item instanceof File) {
        form.append("images", item);
      }
    });

    axios
      .put("http://localhost:80/markets/update", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("수정 성공!");
        navigate(`/markets/${marketNo}`);
      })
      .catch((err) => {
        console.error(err);
        alert("수정 실패");
      });
  };

  return (
    <div className="market-container">
      <h1 className="page-title">게시글 수정</h1>
      <form
        onSubmit={handleSubmit}
        className="market-form"
        encType="multipart/form-data"
      >
        <label>판매상태</label>
        <select
          name="marketStatus"
          value={formData.marketStatus}
          onChange={handleChange}
        >
          <option value="N">판매중</option>
          <option value="Y">판매완료</option>
        </select>

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
          <label key={i} className="label-flex img-label">
            <div>
              상세 이미지 <em className="text-danger">*</em>
            </div>
            {!deletedImages[i] && existingImages[i] && !images[i] && (
              <div className="image-box">
                <img
                  src={`http://localhost${existingImages[i].imgUrl}`}
                  alt={`기존 이미지 ${i}`}
                />
                <button
                  className="img-delete-btn"
                  type="button"
                  onClick={() => handleDeleteImage(i)}
                >
                  ✕
                </button>
              </div>
            )}
            {(deletedImages[i] || !existingImages[i]) && (
              <input
                type="file"
                name={`image-${i}`}
                accept="image/*"
                onChange={(e) => handleImageChange(e, i)}
              />
            )}
          </label>
        ))}

        <button type="submit" className="btn market-btn">
          수정 완료
        </button>
      </form>
    </div>
  );
};

export default MarketEdit;
