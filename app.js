require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");

const database = require("./database/connect");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/api/users");
var donateRouter = require("./routes/api/donate");
var authRouter = require("./routes/api/auth");
var courseRouter = require("./routes/api/course");
var eventRouter = require("./routes/api/event");
var registerEventRouter = require("./routes/api/registerEvent");
var registerCourseRouter = require("./routes/api/registerCourse");
var postRouter = require("./routes/api/post");
var commentRouter = require("./routes/api/comment");
var FollowerRouter = require("./routes/api/follower");

const { isLoggedIn } = require("./middlewares/authMiddleware");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Setup Swagger API documentation
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "",
      url: "",
    },
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/api/*.js"],
  // apis: ["./modules/*/router"],
};
const swaggerSpec = swaggerJSDoc(options);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/donates", donateRouter);
app.use("/courses", courseRouter);
app.use("/events", eventRouter);
app.use("/auth", authRouter);
app.use("/register-event", registerEventRouter);
app.use("/register-course", registerCourseRouter);
app.use("/posts", postRouter);
app.use("/followers", FollowerRouter);
app.use("/comments", commentRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

(async () => {
  /* … */
  await database.connectDatabase();
})();

module.exports = app;
