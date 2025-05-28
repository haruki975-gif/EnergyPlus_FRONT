import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import global from "../../../conf";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Chart1 = () => {
  const [chartData, setChartData] = useState(null);

  const apiUrl = global.API_URL;

  useEffect(() => {
    const fetchAllPages = async () => {
      const allData = [];

      for (let page = 1; page <= 10; page++) {
        try {
          const res = await axios.get(
            `${apiUrl}/apis/energyUsage1?pageNo=${page}`
          );

          const items = res.data.opentable?.field || [];
          allData.push(...items);
        } catch (error) {
          console.error(`page ${page} 불러오기 실패`, error);
        }
      }

      const grouped = {};
      allData.forEach((item) => {
        const energy = item.ENGSRC_NM;
        const value = parseFloat(item.USEMS_QNTY);
        if (!grouped[energy]) grouped[energy] = 0;
        grouped[energy] += value;
      });

      const labels = Object.keys(grouped);
      const values = labels.map((k) => grouped[k]);

      setChartData({
        labels,
        datasets: [
          {
            label: "상업부문-업종별 에너지 사용량",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });
    };

    fetchAllPages();
  }, []);

  if (!chartData) return <div>로딩 중...</div>;

  return (
    <div style={{ height: "300px", width: "500px" }}>
      <Bar data={chartData} />
    </div>
  );
};

export default Chart1;
