const express = require("express");
const {PORT} = require("./config/config");
const {addFeedback} = require("./models/feedbackModel")
const app = express();

app.use(express.json());
app.set("view engine", "ejs")
app.get('/feedbacks', (req, res) =>{
    res.render("feedbacks");
});
app.route('/add-feedback')
    .get((req, res) =>{
        res.render("add-feedback");
    })
    .post((async (req, res) =>{
        const { feedback } = req.body;
        try{
            await addFeedback(feedback);
            res.status(201).json({message: "Feedback created successfully"});
        }
        catch (error){
            console.error(`Error writing a new feedback: ${error}`);
            res.status(500).json({msg: "Error writing a new feedback"});
        }
    }));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});