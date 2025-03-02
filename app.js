//Third party modules
const express = require("express");
const favicon = require("serve-favicon");

//Built in module
const path = require("path");

//My Files
const {PORT} = require("./config/config");
const loggerMiddleware = require("./middlewares/logger");
const feedbackController = require("./controllers/feedbackController");
const pageNotFound = require("./controllers/errorControllers");
const getHomePage = require("./controllers/homeController");


const app = express();

app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, "public", "icons","favicon.ico")));

app.set("view engine", "ejs")

//Requests
app.get("/", getHomePage);
app.get('/feedbacks', feedbackController.getFeedbacks)
app.route('/add-feedback')
    .get(feedbackController.getAddFeedback)
    .post(feedbackController.postAddFeedback)

app.put("/feedbacks/:id", feedbackController.putLikeFeedbacks);
app.use(pageNotFound.pageNotFound);

//Server listening to PORT:3000 or 8080
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});