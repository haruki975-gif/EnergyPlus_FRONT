import styled from "styled-components";
import CardNewsMain from "../../CardNews/CardNewsMain";
import MainSection1 from "../../Main/MainSection1";
import MainSection2 from "../../Main/MainSection2";
import MainSection3 from "../../Main/MainSection3";

const Home = () => {
  return (
    <>
      <HomeLayout>
        <br />
        <MainSection2 />
        <MainSection1 />
        <MainSection3 />
        <CardNewsMain />
      </HomeLayout>
    </>
  );
};
export default Home;

const HomeLayout = styled.div`
  min-height: 600px;
`;
