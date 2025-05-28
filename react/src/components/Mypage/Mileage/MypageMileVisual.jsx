import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import { ChartContainer, ButtonWrap, ChartLabel, ChartWrap, Container,
  Content, GreenBtn, MileageBox, NoDataBox, NoDataText, Title, WhiteBtn } from "./MypageMileVisual.style";


const MypageMileVisual = () => {

  const navi = useNavigate();
  const [totalMile, setTotalMile] = useState(0); // 마일리지 총합
  const [categoryData, setCategoryData] = useState([0, 0, 0]); // 카테고리
  const token = sessionStorage.getItem("accessToken");

  const [isLoaded, setIsLoaded] = useState(false);
  const [isAllZero, setIsAllZero] = useState(false);

  // 마일리지 총합 조회
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost/totalmile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalMile(response.data.totalScore);
      } catch(error) {
        console.error("총 마일리지 불러오기 실패", error);
      }
    };
    
    fetchUserData();
  }, []);


  // 카테고리별 마일리지 총합 조회
  useEffect(() => {
    const fetchCateSum = async () => {
      try {
        const response = await axios.get("http://localhost/totalcategory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const { bikeTotal = 0, reuseTotal = 0, etcTotal = 0 } = response.data;
        const newData = [bikeTotal, reuseTotal, etcTotal];

        // newData가 전부 0인지 확인해서 allZero 플래그로 구분
        const allZero = newData.join("") === "000";
        
        setCategoryData(newData);
        setIsAllZero(allZero);
        setIsLoaded(true);

      } catch (error) {
        console.error("카테고리별 마일리지 불러오기 실패", error);
        setCategoryData([0, 0, 0]);
        setIsAllZero(true);

      } finally {
        setIsLoaded(true); // 여기서 무조건 로딩 끝으로 바꿈
      }
    };
  
    fetchCateSum();
  }, []);

  const consumedData = {
    labels: ["자전거", "다회용기", "기타"],
    datasets: [
      {
        data: categoryData,
        backgroundColor: ["#81c784", "#ffb74d", "#64b5f6"],
        borderWidth: 1,
      },
    ],
  };

  return(
    <>
      <Container>
        <Title>마일리지 현황</Title>

        <Content>
          <MileageBox>
            <p>사용 가능한 마일리지</p>
            <strong>
              {totalMile}<span>마일리지</span>
            </strong>
          </MileageBox>

          <ChartWrap>
            <ChartContainer>
              {!isLoaded ? (
                <NoDataText>로딩 중...</NoDataText>
              ) : isAllZero ? (
                <NoDataBox>
                  <NoDataText>아직 적립 내역이 없습니다 😢</NoDataText>
                </NoDataBox>
              ) : (
                <Pie data={consumedData} />
              )}
            </ChartContainer>
            <ChartLabel>내가 적립한 마일리지</ChartLabel>
          </ChartWrap>

        </Content>

        <ButtonWrap>
          <GreenBtn onClick={() => navi("/mypage_mile")}>마일리지 신청 현황 바로가기</GreenBtn>
          <WhiteBtn onClick={() => navi("/mypage_main")}>뒤로가기</WhiteBtn>
        </ButtonWrap>
      </Container>
    </>
  );
};

export default MypageMileVisual;