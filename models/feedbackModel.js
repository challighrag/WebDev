//Built in modules
const fs = require("fs").promises;
const path = require("path");

//Third party modules
const { v4: uuidv4 } = require("uuid");

const filepath = path.join(__dirname, "..", "data","feedbacks.json");

const getFeedbacks = async () => {
    try{
        const feedbacks = await fs.readFile(filepath,"utf8");
        return feedbacks ? JSON.parse(feedbacks) : [];
    }
    catch (error) {
        console.error(`Error reading file: ${error}`);
    }
};
const addFeedback = async (feedbackTxt) => {
    const feedbackObj = {
        id: uuidv4(),
        feedback: feedbackTxt,
        likes: 0
    }
    try{
        const feedbacks = await getFeedbacks();
        feedbacks.push(feedbackObj);
        await fs.writeFile(filepath,JSON.stringify(feedbacks),'utf8');
    }
    catch (error) {
        console.error(`Error writing file: ${error}`);
        return [];
    }
};
const likeFeedback = () => {
    
};

module.exports = {
    addFeedback,
    getFeedbacks,
    likeFeedback
};