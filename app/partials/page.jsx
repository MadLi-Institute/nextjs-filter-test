import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";

const Charts = ({ stock_quantity, trade_brokers }) => {
  
  const separete_trade_broker = Object.values(trade_brokers);
  const names = separete_trade_broker.map((v) => v.name)
  const nums = separete_trade_broker.map((v) => v.number)


  return (
    <div className="grid grid-cols-2 w-full p-5">
      <div className="w-96 h-full">
        <BarChart data={stock_quantity}/>
      </div>
      <div className="w-96 h-full">
        <PieChart label={names} quantity={nums}/>
      </div>
    </div>
  );
};

export default Charts;
