import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import global from "../../../conf";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart2 = () => {
  const [pieChartData, setPieChartData] = useState(null);

  const apiUrl = global.API_URL;

  useEffect(() => {
    const fetchEnergyUsage2 = async () => {
      const allData = [];

      for (let page = 1; page <= 10; page++) {
        try {
          const res = await axios.get(
            `${apiUrl}/apis/energyUsage2?pageNo=${page}`
          );
          console.log(`energyUsage2 page ${page}:`, res.data);

          const items = res.data.opentable?.field || [];
          allData.push(...items);
        } catch (error) {
          console.error(`energyUsage2 page ${page} 실패`, error);
        }
      }

      const grouped = {};
      allData.forEach((item) => {
        const plant = item.ENGSRC_NM;
        const value = parseFloat(item.USEMS_QNTY);
        if (!grouped[plant]) grouped[plant] = 0;
        grouped[plant] += value;
      });

      const labels = Object.keys(grouped);
      const values = labels.map((k) => grouped[k]);

      const colors = labels.map(
        (_, idx) => `hsl(${(idx * 360) / labels.length}, 70%, 60%)`
      );

      setPieChartData({
        labels,
        datasets: [
          {
            label: "상업부문-용도별 에너지 사용량",
            data: values,
            backgroundColor: colors,
          },
        ],
      });
    };

    fetchEnergyUsage2();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: 0,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          font: { size: 10 },
        },
      },
    },
  };

  return (
    <div style={{ height: "300px", width: "500px" }}>
      {pieChartData ? (
        <Pie data={pieChartData} options={options} />
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Chart2;
