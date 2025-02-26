//Third party modules
const express = require("express");
const favicon = require("serve-favicon");

//Built in module
const path = require("path");

//My Files
const {PORT} = require("./config/config");
const {addFeedback} = require("./models/feedbackModel");
const loggerMiddleware = require("./middlewares/logger");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, "public", "icons","favicon.ico")));
app.use(loggerMiddleware);
app.set("view engine", "ejs")

//Requests
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
            res.status(200).json({message: "Feedback created successfully"});
        }
        catch (error){
            console.error(`Error writing a new feedback: ${error}`);
            res.status(500).json({msg: "Error writing a new feedback"});
        }
    }));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});