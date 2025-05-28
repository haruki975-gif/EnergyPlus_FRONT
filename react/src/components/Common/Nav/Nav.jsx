import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navi = useNavigate();

  return (
    <>
      <div className="nav">
        <ul>
          <li className="nav-item" onClick={() => navi("/")}>
            HOME
          </li>
          <li className="nav-item">
            소개
            <ul>
              <li>소개 1</li>
              <li>소개 2</li>
            </ul>
          </li>
          <li className="nav-item">
            마일리지
            <ul>
              <li onClick={() => navi("/mileageInfo")}>마일리지 안내</li>
              <li onClick={() => navi("/mileagestore")}>마일리지 사용</li>
            </ul>
          </li>
          <li className="nav-item">
            챌린지
            <ul>
              <li onClick={() => navi("/challenge/info")}>챌린지 안내</li>
              <li onClick={() => navi("/challenges")}>챌린지 목록</li>
              <li onClick={() => navi("/challenges/write")}>챌린지 신청</li>
            </ul>
          </li>
          <li className="nav-item">
            커뮤니티
            <ul>
              <li onClick={() => navi("/notices")}>공지사항</li>
              <li onClick={() => navi("/faq")}>FAQ</li>
              <li onClick={() => navi("/market_list")}>중고거래</li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;

const NavLayout = styled.nav`
  height: 66px;
  background: linear-gradient(90deg, #85c662 0%, #57b1ff 100%);
`;

const NavLinks = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  position: relative;
  color: white;
  font-family: Pretendard;
  font-size: 26px;
  cursor: pointer;

  &:hover > div {
    display: block;
  }
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  min-width: 140px;
  border: 1px solid lightgray;
  z-index: 10;
  border-radius: 6px;
`;

const DropdownItem = styled.a`
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
  font-size: 20px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
