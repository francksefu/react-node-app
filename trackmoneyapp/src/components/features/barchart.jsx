import { Bar } from "react-chartjs-2";

export default function BarChart ({BarChart}) {
    return (
        <div className="chart-container">
          <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
          <Bar
            data={BarChart}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Expenses related to differents categories"
                },
                legend: {
                  display: false
                }
              }
            }}
          />
        </div>
      );
}
