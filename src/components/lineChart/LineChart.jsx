import { useEffect } from "react";
import Chart from "react-google-charts";
import { useDispatch, useSelector } from "react-redux";
import { cryptoActions } from "../../store/features/cryptoSlice";

const LineChart = () => {
  const { receivedCopyData, chartHistoryData } = useSelector(
    (state) => state.crypto
  );
  const dispatch = useDispatch();
  useEffect(() => {
    let copyData = [["Date", "Prices"]];
    if (chartHistoryData.prices) {
      chartHistoryData.prices.map((item) => {
        copyData.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
      dispatch(cryptoActions.setReceivedCopyData(copyData));
    }
  }, [chartHistoryData]);
  return (
    <Chart
      chartType="LineChart"
      data={receivedCopyData}
      height="100%"
      legendToggle
    />
  );
};

export default LineChart;
