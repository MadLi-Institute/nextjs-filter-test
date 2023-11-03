import connect from "@/libs/mongodb";
import Crypto from "@/models/Crypto";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    // Pagination
    const page = parseInt(searchParams.get("page")) - 1 || 0;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const skip = page * limit;
    // Search
    const search = searchParams.get("search") || "";
    // Sorting
    let sort = searchParams.get("sort") || "trade_id";
    // Filter
    let stock_symbol = searchParams.get("stock_symbol") || "All";
    let trade_broker = searchParams.get("trade_broker") || "All";

    stock_symbol === "All"
      ? (stock_symbol = [...stock_symbol_data])
      : (stock_symbol = searchParams.get("stock_symbol").split(","));

    trade_broker === "All"
      ? (trade_broker = [...trade_broker_data])
      : (trade_broker = searchParams.get("trade_broker").split(","));

    searchParams.get("sort")
      ? (sort = searchParams.get("sort").split(","))
      : (sort = [sort]);

    let sortBy = {};
    if (sort[1] === "desc") {
      sortBy[sort[0]] = -1;
    } else {
      sortBy[sort[0]] = 1;
    }

    // Fetch Data
    await connect();
    const crypto_data = await Crypto.aggregate([
      {
        $match: {
          trade_account: { $regex: search, $options: "i" },
          stock_symbol: { $in: stock_symbol },
          trade_broker: { $in: trade_broker },
        },
      },
      {
        $sort: sortBy,
      },
      {
        $limit: skip + limit,
      },
      {
        $skip: skip,
      },
    ]);

    const total = await Crypto.aggregate([
      {
        $match: {
          trade_account: { $regex: search, $options: "i" },
          stock_symbol: { $in: stock_symbol },
          trade_broker: { $in: trade_broker },
        },
      },
      {
        $project: {
          AAPL: {
            $cond: [{ $eq: ["$stock_symbol", "AAPL"] }, 1, 0],
          },
          MSFT: {
            $cond: [{ $eq: ["$stock_symbol", "MSFT"] }, 1, 0],
          },
          GOOGL : {
            $cond: [{ $eq: ["$stock_symbol", "GOOGL"] }, 1, 0],
          },
          FB: {
            $cond: [{ $eq: ["$stock_symbol", "FB"] }, 1, 0],
          },
          AMZN: {
            $cond: [{ $eq: ["$stock_symbol", "AMZN"] }, 1, 0],
          },
          Fidelity : {
            $cond: [{ $eq: ["$trade_broker", "Fidelity"] }, 1, 0],
          },
          ETRADE : {
            $cond: [{ $eq: ["$trade_broker", "E*TRADE"] }, 1, 0],
          },
          TD_Ameritrade : {
            $cond: [{ $eq: ["$trade_broker", "TD Ameritrade"] }, 1, 0],
          },
          Charles_Schwab : {
            $cond: [{ $eq: ["$trade_broker", "Charles Schwab"] }, 1, 0],
          },
        },
      },
      {
        $group: {
          _id: null,
          AAPL: { $sum: "$AAPL" },
          MSFT: { $sum: "$MSFT" },
          GOOGL: { $sum: "$GOOGL" },
          FB: { $sum: "$FB" },
          AMZN: { $sum: "$AMZN" },
          Fidelity: { $sum: "$Fidelity" },
          ETRADE: { $sum: "$ETRADE" },
          TD_Ameritrade: { $sum: "$TD_Ameritrade" },
          Charles_Schwab: { $sum: "$Charles_Schwab" },
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          stock_quantity: {
            AAPL: "$AAPL",
            MSFT: "$MSFT",
            GOOGL: "$GOOGL",
            FB: "$FB",
            AMZN: "$AMZN",
          },
          trade_broker: {
            Fidelity : {
              name: "Fidelity",
              number: "$Fidelity"
            },
            ETRADE : {
              name: "E*TRADE",
              number: "$ETRADE"
            },
            TD_Ameritrade : {
              name: "TD Ameritrade",
              number: "$TD_Ameritrade"
            },
            Charles_Schwab : {
              name: "Charles Schwab",
              number: "$Charles_Schwab"
            },
          },
          total: "$total",
        },
      },
    ]);

    const response = {
      error: false,
      stock_quantity: total[0].stock_quantity,
      trade_brokers: total[0].trade_broker,
      total: total[0].total,
      page: page + 1,
      limit,
      crypto_data,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    throw new Error(error);
  }
}

const stock_symbol_data = ["AAPL", "AMZN", "FB", "GOOGL", "MSFT"];
const trade_broker_data = [
  "Charles Schwab",
  "E*TRADE",
  "Fidelity",
  "TD Ameritrade",
];
