import { Schema, models, model } from "mongoose";

const cryptoSchema = new Schema({
    stock_symbol: {type: String},
    trade_type: {type: String},
    trade_date: {type: String},
    trade_price: {type: String},
    trade_quantity: {type: String},
    trade_currency: {type: String},
    trade_broker: {type: String},
    trade_account: {type: String},
    trade_status: {type: String},
})

const Crypto = models.Crypto || model("Crypto", cryptoSchema)

export default Crypto;