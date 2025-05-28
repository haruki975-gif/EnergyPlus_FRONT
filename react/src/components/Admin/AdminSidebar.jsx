import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Sidebar>
        <h3 style={{ marginBottom: "0px" }}>관리자 메뉴</h3>
        <MenuButton onClick={() => navigate("/admin")}>
          관리자 메인페이지
        </MenuButton>
        <MenuButton onClick={() => navigate("/admin/mileage/list")}>
          마일리지 신청
        </MenuButton>
        <MenuButton onClick={() => navigate("/admin/members")}>
          회원 관리
        </MenuButton>
        <MenuButton onClick={() => navigate("/admin/cardnews")}>
          카드뉴스 관리
        </MenuButton>
        <MenuButton onClick={() => navigate("/admin/challenges")}>
          챌린지 관리
        </MenuButton>
        <MenuButton onClick={() => navigate("/admin/notices")}>
          공지사항 관리
        </MenuButton>
        <MenuButton onClick={() => navigate("/admin/market/main")}>
          중고거래 관리
        </MenuButton>
        <MenuButton onClick={() => navigate("/admin/mypage_qna")}>
          QnA 관리
        </MenuButton>
      </Sidebar>
    </>
  );
};

export default AdminSidebar;

const Sidebar = styled.div`
  position: fixed;
  top: 200px;
  left: 150px;
  width: 160px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none; /* 모바일이나 좁은 화면에서는 숨김 */
  }
`;

const MenuButton = styled.button`
  background-color: #408c70;
  color: white;
  border: none;
  padding: 10px 12px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #408c70;
  }
`;