const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    reason: {
        type: String,
        required: true
    },
    approver1: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    approver2: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    gymService: { type: mongoose.Schema.Types.ObjectId, ref: 'GYM_SERVICE'},
    leaveType: { type: mongoose.Schema.Types.ObjectId, ref: 'LeaveType'},
    status:{
        type: String,
        default: 'PENIDNG'
    },
    date: {
        type: Date,
        default: Date.now()
    }
  },
  {
    timestamps: true
  });

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
