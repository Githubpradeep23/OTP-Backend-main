const { isEmpty } = require("lodash");
const Request = require("../../models/serviceRequest");
const followup = require("../../models/todo/followUp");

const submit = async (req, res) => {
    try {
        const { dob, gender, timeSlot, reminderCall, demo, remarks, gymService, userId, type, gym_branch } = req.body;
        if (
            gender !== "" &&
            gender !== undefined &&
            gender !== null &&
            timeSlot !== "" &&
            timeSlot !== undefined &&
            timeSlot !== null &&
            type !== "" &&
            type !== undefined &&
            type !== null &&
            gymService !== "" &&
            gymService !== undefined &&
            gymService !== null &&
            userId !== "" &&
            userId !== undefined &&
            userId !== null) {
                let followupModel = {
                    gender,
                    timeSlot,
                    type,
                    gymService,
                    userId
                  };
                if(dob !== null && dob !== '' && dob !== undefined){
                    followupModel['dob'] = dob;
                }
                if(reminderCall !== null && reminderCall !== '' && reminderCall !== undefined){
                    followupModel['reminderCall'] = reminderCall;
                }
                if(demo !== null && demo !== '' && demo !== undefined){
                    followupModel['demo'] = demo                                                                                   ;
                }
                if(remarks !== null && remarks !== '' && remarks !== undefined){
                    followupModel['remarks'] = remarks                                                                                   ;
                }
                if(!isEmpty(gym_branch)) {
                  followupModel['gym_branch'] = gym_branch
                }
                let followUpResponse = await followup.create(followupModel);
                return res.status(200).json({
                  followUp: followUpResponse,
                  message: "Added New FollowUp Successfully",
                  success: true,
                });
            } else {
            return res.status(422).json({
                message: "Empty Fields found. Either gender, timeSlot, type, gymService and userId missing.",
                success: false,
            });
        }
    } catch(error) {
        return res.status(500).json({ message: error.message, success: false });
    }
    
}

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
          return res.status(200).json({
            message: "FollowUp Id Not found",
            success: false,
          });
        } else if (id !== undefined && id !== null && id !== "") {
          let deleteFollowUp = await followup.deleteOne({ _id: id });
          if (
            deleteFollowUp["deletedCount"] === 0 ||
            deleteFollowUp === null ||
            deleteFollowUp === undefined
          ) {
            return res.status(404).json({
              id,
              message: "FollowUp Not found ",
              success: true,
            });
          } else if (
            deleteFollowUp["deletedCount"] === 1 ||
            deleteFollowUp !== null ||
            deleteFollowUp !== undefined
          ) {
            return res.status(200).json({
              id,
              message: "FollowUp Deleted Successfully !!! ",
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
        let followUps = await followup.find().populate('gymService').populate('gym_branch').populate('userId').exec();
        let getAllFollowUps = [];
        for(let followUp of followUps) {
          getAllFollowUps.push({
            ...followUp._doc,
            branchName: followUp.gym_branch ? followUp.gym_branch.branchName : undefined,
            branchLocation: followUp.gym_branch ? followUp.gym_branch.location : undefined,
          })
        }
        if (
          getAllFollowUps !== undefined &&
          getAllFollowUps.length !== 0 &&
          getAllFollowUps !== null
        ) {
          return res.status(200).send({
            followUps: getAllFollowUps,
            messge: "All FollowUps",
            success: true,
          });
        } else {
          return res.status(200).send({
            messge: "FollowUp does not exist",
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

const getAllByType = async (req, res) => {
  try {
      const type = req.params['type'];
      let followUps = await followup.find({ type }).populate('gymService').populate('gym_branch').populate('userId').exec();
      if (
          followUps !== undefined &&
          followUps.length !== 0 &&
          followUps !== null
      ) {
        return res.status(200).send({
          followUps ,
          messge: "All FollowUps",
          success: true,
        });
      } else {
        return res.status(200).send({
          messge: "FollowUp does not exist",
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

module.exports = { submit, deleteTodo, getAll, getAllByType };