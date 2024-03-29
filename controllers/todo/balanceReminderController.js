const { isEmpty } = require("lodash");
const balanceReminder = require("../../models/todo/balanceReminder");

const submit = async (req, res) => {
    try {
        const { timeSlot, totalFees, demo, balancePaid, gymService, userId, balance, gym_branch } = req.body;
        if (isNaN(totalFees) || isEmpty(timeSlot) || isEmpty(gymService) || isEmpty(userId)) {
            return res.status(422).json({
                message: "Empty Fields found. Either totalFees, timeSlot, gymService and userId missing.",
                success: false,
            });
        }
        let balanceReminderModel = {
            timeSlot,
            totalFees,
            gymService,
            userId,
            gym_branch: isEmpty(gym_branch) ? undefined : gym_branch
        };
        if(balancePaid !== null && balancePaid !== '' && balancePaid !== undefined){
            balanceReminderModel['balancePaid'] = balancePaid                                                                                   ;
        }
        if(demo !== null && demo !== '' && demo !== undefined){
            balanceReminderModel['demo'] = demo                                                                                   ;
        }
        balanceReminderModel['balance'] = isNaN(balance) ? 0 : balance;
        let balanceReminderResponse = await balanceReminder.create(balanceReminderModel);
        return res.status(200).json({
            balanceReminder: balanceReminderResponse,
            message: "Added New Balance Reminder Successfully",
            success: true,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}

const deleteBalanceReminder = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "Balance Reminder Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteBalanceReminder = await balanceReminder.deleteOne({ _id: id });
          if (
            deleteBalanceReminder["deletedCount"] === 0 ||
            deleteBalanceReminder === null ||
            deleteBalanceReminder === undefined
          ) {
            return res.status(404).json({
              id,
              message: "Balance Reminder Not found ",
              success: true,
            });
          } else if (
            deleteBalanceReminder["deletedCount"] === 1 ||
            deleteBalanceReminder !== null ||
            deleteBalanceReminder !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "Balance Reminder Deleted Successfully !!! ",
              success: true,
            });
          }
        }
      } catch (error) {
        return res.status(500).json({
          message: "Something went wrong",
          success: false,
        });
      }
}

const getAll = async (req, res) => {
    try {
        let balanceReminders = await balanceReminder.find().populate('gymService').populate('gym_branch').populate('userId').exec();
        let getAllBalanceReminders = [];
        for(let balanceReminder of balanceReminders) {
          getAllBalanceReminders.push({
            ...balanceReminder._doc,
            branchName: balanceReminder.gym_branch ? balanceReminder.gym_branch.branchName : undefined,
            branchLocation: balanceReminder.gym_branch ? balanceReminder.gym_branch.location : undefined,
          })
        }
        if (
          getAllBalanceReminders !== undefined &&
          getAllBalanceReminders.length !== 0 &&
          getAllBalanceReminders !== null
        ) {
          return res.status(200).send({
            balanceReminders: getAllBalanceReminders ,
            messge: "All Balance Reminders",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "Balance Reminders does not exist",
            success: false,
          });
        }
      } catch (error) {
        return res.status(400).send({
          messge: "Somethig went wrong",
          success: false,
        });
      }
}

module.exports = { submit, deleteBalanceReminder, getAll };