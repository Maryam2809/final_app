import React, { useEffect, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

const Analytics = () => {
  const [pieChartData, setPieChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch analytics data from Flask API
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/analytics-data");
        const { pie_chart, bar_chart } = response.data;
        setPieChartData(pie_chart);
        setBarChartData(bar_chart);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="analytics-container">
      <h1>Analytics Dashboard</h1>
      <div className="chart-container">
        <h2>Pie Chart</h2>
        {pieChartData && (
          <Plot
            data={[
              {
                labels: pieChartData.labels,
                values: pieChartData.values,
                type: "pie",
                hole: 0.4, // For a donut chart (set to 0 for a full pie)
              },
            ]}
            layout={{
              title: "Distribution of Notes by Folder",
            }}
          />
        )}
      </div>
      <div className="chart-container">
        <h2>Bar Chart</h2>
        {barChartData && (
          <Plot
            data={[
              {
                x: barChartData.labels,
                y: barChartData.values,
                type: "bar",
                marker: { color: "#36A2EB" },
              },
            ]}
            layout={{
              title: "Notes Created Over Time",
              xaxis: { title: "Time Period" },
              yaxis: { title: "Number of Notes" },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Analytics;
