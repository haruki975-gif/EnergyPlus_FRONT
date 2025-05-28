import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Common/Footer/Footer";
import Header from "./components/Common/Header/Header";
import Home from "./components/Common/Home/Home";
import MileageInfo from "./components/Mileage/MileageInfo/MileageInfo";
import MypageMain from "./components/Mypage/MypageMain";
import Notices from "./components/Notice/Notices";
import NoticeDetail from "./components/Notice/NoticeDetail";
import MarketList from "./components/Market/MarketList";
import MileageForm from "./components/Mileage/MileageForm/MileageForm";
import MarketDetail from "./components/Market/MarketDetail";
import MarketForm from "./components/Market/MarketForm";
import MarketEdit from "./components/Market/MarketEdit";
import MypageInfo from "./components/Mypage/Member/MypageInfo";
import MypageQna from "./components/Mypage/Qna/MypageQna";
import MypageDelMember from "./components/Mypage/Member/MypageDelMember";
import MypageQnaForm from "./components/Mypage/Qna/MypageQnaForm";
import MypageQnaDetail from "./components/Mypage/Qna/MypageQnaDetail";
import ChallengeList from "./components/Challenge/Challenges";
import ChallengeWrite from "./components/Challenge/ChallengeWrite";
import ChallengeDetail from "./components/Challenge/ChallengeDetail";
import SignupForm from "./components/Signup/SignupForm";
import LoginForm from "./components/Login/LoginForm";
import MileageStore from "./components/Mileage/MileageStore/MileageStore";
import MileageList from "./components/Admin/Mileage/MileageList";
import ChallengeEdit from "./components/Challenge/ChallengeEdit";
import MypageQnaWrite from "./components/Mypage/Qna/MypageQnaWrite";
import MypageMarket from "./components/Mypage/Market/MypageMarket";
import MypageMarketDetail from "./components/Mypage/Market/MypageMarketDetail";
import MypagePassword from "./components/Mypage/Member/MypagePassword";
import CardNewsList from "./components/CardNews/CardNewsList";
import CardNewsDetail from "./components/CardNews/CardNewDetail";
import MypageMile from "./components/Mypage/Mileage/MypageMile";
import MypageMileVisual from "./components/Mypage/Mileage/MypageMileVisual";
import Member from "./components/Admin/member/Member";
import Faq from "./components/FAQ/Faq";
import AdminNotices from "./components/Admin/Notice/AdminNotices";
import AdminNoticeWrite from "./components/Admin/notice/AdminNoticeWrite";
import Admin from "./components/Admin/Admin";
import KakaoCallback from "./components/Login/kakaoCallback";
import LoginSuccess from "./components/Login/LoginSuccess";
import AdminCardNewsForm from "./components/Admin/CardNews/AdminCardNewsForm";
import AdminCardNewsEdit from "./components/Admin/CardNews/AdminCardNewsEdit";
import AdminQna from "./components/Admin/Qna/AdminQna";
import AdminQnaDetail from "./components/Admin/Qna/AdminQnaDetail";
import AdminCardNewsList from "./components/Admin/CardNews/AdminCardNewsList";
import AdminCardNewsDetail from "./components/Admin/CardNews/AdminCardNewsDetail";

import PasswordRecovery from "./components/Password/PasswordRecovery";
import PasswordReset from "./components/Password/PasswordReset";
import SignupType from "./components/Signup/SignupType";

import Agreement from "./components/Agreement/Agreement";
import AdminNoticeEdit from "./components/Admin/Notice/AdminNoticeEdit";
import AdminNoticeDetail from "./components/Admin/Notice/AdminNoticeDetail";
import AdminChallenges from "./components/Admin/Challenge/AdminChallenges";
import AdminChallengeDetail from "./components/Admin/Challenge/AdminChallengeDetail";
import MileageDetail from "./components/Admin/Mileage/MileageDetail";
import MarketReportList from "./components/Admin/Market/MarketReport/MarketReportList";
import MarketReportDetail from "./components/Admin/Market/MarketReport/MarketReportDetail";
import MarketMain from "./components/Admin/Market/MarketMain";
import MarketManage from "./components/Admin/Market/MarketManage/MarketManage";
import MarketManageDetail from "./components/Admin/Market/MarketManage/MarketManageDetail";
import ChallengeInfo from "./components/Challenge/Challengeinfo";


function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          {/* 각자 라우트 추가하기~~ */}
          <Route path="/" element={<Home />} />
          {/* 공지사항 */}
          <Route path="/notices" element={<Notices />} />
          <Route path="/notices/:noticeId" element={<NoticeDetail />} />

          {/* 관리자 공지사항 */}
          <Route path="/admin/notices" element={<AdminNotices/>} />
          <Route path="/admin/notices/:noticeId" element={<AdminNoticeDetail />} />
          <Route path="/admin/noticewrite" element={<AdminNoticeWrite/>} />
          <Route path="/admin/notices/:noticeId/edit" element={<AdminNoticeEdit/>} />

          {/* 챌린지 */}
          <Route path="/challenges" element={<ChallengeList />} />
          <Route path="/challenge/info" element={<ChallengeInfo />} />
          <Route path="/challenges/:challengeSeq" element={<ChallengeDetail />}/>
          <Route path="/challenges/write" element={<ChallengeWrite />} />
          <Route path="/challenges/edit/:challengeSeq" element={<ChallengeEdit />} />

          {/* 관리자 챌린지 */}
          <Route path="/admin/challenges" element={<AdminChallenges />} />
          <Route path="/admin/challenges/:challengeSeq" element={<AdminChallengeDetail/>}/>


          {/* 마일리지 */}
          <Route path="/mileageinfo" element={<MileageInfo />} />
          <Route path="/mileagestore" element={<MileageStore />} />
          <Route path="/admin/mileage/list" element={<MileageList />} />
          <Route
            path="/admin/mileage/:mileageSeq"
            element={<MileageDetail />}
          />

          {/* 마이페이지 */}
          <Route path="/mypage_main" element={<MypageMain />} />
          <Route path="/mypage_info" element={<MypageInfo />} />
          <Route path="/mypage_delMember" element={<MypageDelMember />} />
          <Route path="/mypage_qna" element={<MypageQna />} />
          <Route path="/mypage_qna_write" element={<MypageQnaWrite />} />
          {/* 새글 작성 */}
          <Route path="/mypage_qna_form/:id" element={<MypageQnaForm />} />
          {/* 글 수정 */}
          <Route path="/mypage_qna/:id" element={<MypageQnaDetail />} />
          {/* 나의 게시글 메인 */}
          <Route path="/mypage_market" element={<MypageMarket />} />
          {/* 나의 게시글 상세 */}
          <Route
            path="/mypage_market/:marketNo"
            element={<MypageMarketDetail />}
          />
          {/* 비밀번호 변경 */}
          <Route path="/mypage_password" element={<MypagePassword />} />
          {/* 마일리지 현황 */}
          <Route path="/mypage_mile" element={<MypageMile />} />
          {/* 마일리지 시각화 페이지 */}
          <Route path="/mypage_mile_visual" element={<MypageMileVisual />} />
          {/* 중고거래 */}
          <Route path="/market_list" element={<MarketList />} />
          <Route path="/mileage-form" element={<MileageForm />} />
          <Route path="/markets/:marketNo" element={<MarketDetail />} />
          <Route path="/marketform" element={<MarketForm />} />
          <Route path="/markets/edit/:marketNo" element={<MarketEdit />} />
          {/* 회원가입 */}
          <Route path="/signup-form" element={<SignupForm />} />
          <Route path="/signup-type" element={<SignupType />} />
          {/* 로그인 */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/oauth2/kakao/callback" element={<KakaoCallback />} />
          <Route path="/login-success" element={<LoginSuccess />} />
          <Route path="/auth/kakao/callback" element={<kakaoCallback />} />

          {/* 이용약관 */}
          <Route path="/agreement" element={<Agreement />} />

          {/* 관리자 메인 */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/oauth2/kakao/callback" element={<KakaoCallback />} />
          <Route path="/login-success" element={<LoginSuccess />} />

          {/* 관리자 회원관리 */}
          <Route path="/admin/members" element={<Member />} />
          {/* 비번 재설정 */}
          <Route path="/find-password" element={<PasswordRecovery />} />
          <Route path="/password-reset" element={<PasswordReset />} />

          {/* 카드뉴스 */}
          <Route path="/cardnews/list" element={<CardNewsList />} />
          <Route path="/cardnews_detail/:id" element={<CardNewsDetail />} />

          {/* FAQ */}
          <Route path="/faq" element={<Faq />} />
          {/* 관리자 qna */}
          <Route path="/admin/mypage_qna" element={<AdminQna />} />
          <Route path="/admin/mypage_qna/:id" element={<AdminQnaDetail />} />
          {/* <Route path="/admin/mypage_qna" element={<AdminQna />} /> */}

          {/* 관리자 카드뉴스 */}
          <Route path="/admin/cardnews" element={<AdminCardNewsList />} />
          <Route
            path="/admin/cardnews/detail/:id"
            element={<AdminCardNewsDetail />}
          />
          <Route path="/cardnews_form" element={<AdminCardNewsForm />} />
          <Route
            path="/admin/cardnews/edit/:id"
            element={<AdminCardNewsEdit />}
          />
          {/* 관리자 중고거래 */}
          <Route path="/admin/market/main" element={<MarketMain />} />
          <Route path="/admin/market/report" element={<MarketReportList />} />
          <Route
            path="/admin/market/report/:reportId"
            element={<MarketReportDetail />}
          />
          <Route path="/admin/market/list" element={<MarketManage />} />
          <Route
            path="/admin/market/detail/:marketNo"
            element={<MarketManageDetail />}
          />
        </Routes>
        {/* 메인페이지 */}
      </div>
      <Footer />
    </>
  );
}

export default App;
