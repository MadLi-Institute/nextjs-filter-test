import Filtering from "@/components/Filtering";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import Sorting from "@/components/Sorting";
import { Button } from "@nextui-org/button";
import Charts from "./partials/page";

const Home = async ({ searchParams }) => {
  const page = (await searchParams.page) || 1;
  const search = searchParams.search || "";
  const sort = searchParams.sort || "trade_id";
  const stock_symbol = searchParams.stock_symbol || "All";
  const trade_broker = searchParams.trade_broker || "All"

  const { crypto_data, total, limit, stock_quantity, trade_brokers } = await getData(
    page,
    search,
    sort,
    stock_symbol,
    trade_broker
  );
  return (
    <div className="max-w-6xl mx-auto p-10">
      <div className="">
        {total && <Charts stock_quantity={stock_quantity} trade_brokers={trade_brokers}/>}
      </div>
      <div className="flex flex-col gap-10 max-w-5xl mx-auto">
        <div className="flex flex-row gap-5">
          <Search />
          <Button isDisabled className="px-3">{total}</Button>
        </div>
        <div className="flex flex-row justify-between items-center gap-3">
          <Sorting />
          <Filtering />
        </div>
        <div className="w-full my-5">
          {crypto_data.map((v) => (
            <div key={v._id} className="flex flex-col gap-8 w-full p-5 my-5">
              <div className="flex flex-row justify-between">
                <div>Trade ID: {v.trade_id}</div>
                <div>Stock Symbol: {v.stock_symbol}</div>
                <div>
                  Trade Price: {v.trade_price} {v.trade_currency}
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Trade Quantity: {v.trade_quantity}</div>
                <div>Trade Broker: {v.trade_broker}</div>
                <div>Trade Account: {v.trade_account}</div>
              </div>
              <div className="flex flex-row justify-between">
                <div>Trade Status: {v.trade_status}</div>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          key={Math.random() * 10}
          page_num={page}
          total={total}
          limit={limit}
        />
      </div>
    </div>
  );
};

const getData = async (page, search, sort, stock_symbol, trade_broker) => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/crypto?page=${page}&limit=5&search=${search}&sort=${sort}&stock_symbol=${stock_symbol}&trade_broker=${trade_broker}`,
      { cache: "no-cache" }
    );
    if (!res.ok) return;
    return res.json();
  } catch (error) {
    throw new Error(error);
  }
};

export default Home;
