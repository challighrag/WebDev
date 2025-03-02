const feedbackModel = require("../models/feedbackModel");

const getFeedbacks = async (req, res) =>{
    const feedbacks = await feedbackModel.getFeedbacks();
    res.render("feedbacks", { feedbacks });
};
const getAddFeedback = (req, res) => {
    res.render("add-feedback");
};
const postAddFeedback = (async (req, res) =>{
    const { feedback } = req.body;
    try{
        await feedbackModel.addFeedback(feedback);
        res.status(200).json({message: "Feedback created successfully"});
    }
    catch (error){
        console.error(`Error writing a new feedback: ${error}`);
        res.status(500).json({msg: "Error writing a new feedback"});
    }
});

const putLikeFeedbacks = async (req, res) => {
    const id = req.params.id;
    try{
        await feedbackModel.likeFeedback(id);
        res.status(200).json({message: "Feedback liked successfully"});
    }
    catch (error){
        res.status(500).json({msg: "Error liking the feedback"});
        console.error();
    }
};
module.exports = {
    getFeedbacks,
    getAddFeedback,
    postAddFeedback,
    putLikeFeedbacks
};