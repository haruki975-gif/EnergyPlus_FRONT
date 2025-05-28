import React from "react";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import styled from "styled-components";

const MainSection1 = () => {
  return (
    <MainSection>
      <ChartRow>
        <ChartContainer>
          <h5>❓에너지 소비가 많은 업종은 무엇이며, 얼마나 차이 날까?</h5>
          <Chart1 />
          <h3>업종별 에너지 사용량</h3>
        </ChartContainer>
        <ChartContainer>
          <h5>❓에너지가 가장 많이 사용되는 용도는 무엇일까?</h5>
          <Chart2 />
          <h3>용도별 에너지 사용량</h3>
        </ChartContainer>
      </ChartRow>
      <MainSectionContent>
        한 걸음 덜 타고, 한 그릇 덜 버리고, 하나 더 실천하기! <br />
        지구를 가볍게 만들어봐요!! 😊
      </MainSectionContent>
    </MainSection>
  );
};

export default MainSection1;

const MainSection = styled.section`
  background: #f9f9f9;
  padding: 60px 20px;
  text-align: center;
`;

const ChartRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  max-width: 1400px;
  margin: 0 auto;
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding: 24px;
  width: 700px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h5 {
    font-size: 1.2rem;
    color: #555;
    margin-bottom: 25px;
  }

  h3 {
    font-size: 1.2rem;
    color: #228b22;
    font-weight: bold;
    margin-top: 12px;
  }
`;

const MainSectionContent = styled.div`
  font-size: 1.1rem;
  color: #2e7d32;
  background: #e8f5e9;
  padding: 40px 20px;
  margin-top: 40px;
  border-radius: 12px;
  font-weight: 500;
  line-height: 1.7;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;
