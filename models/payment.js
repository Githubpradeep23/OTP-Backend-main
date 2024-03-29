const { mongoose, Schema } = require("mongoose");
const paymentSchema = mongoose.Schema({
  voucher_id : [{ type: Schema.Types.ObjectId, ref: 'Voucher' }],
  userID: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  service_id: [{ type: Schema.Types.ObjectId, ref: 'GYM_SERVICE' }],
  copuan_id: [{ type: Schema.Types.ObjectId, ref: 'Copuan'}],
  orderDetails: {
    type: Object,
    required: true,
  },
  duration: {
    type: String,
    default: null
  },
  price: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now(),

  },
});
const Payment = new mongoose.model("Payment", paymentSchema);
module.exports = Payment;
