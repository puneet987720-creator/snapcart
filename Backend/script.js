const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);
const db_path = process.env.DATA_URL;
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const rootdir = require("./utils/pathUtil");
const mongodb = require("mongodb");

const authRoutes = require("./routes/authroutes");
const productRoutes = require("./routes/productroutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

const store = new mongodbStore({
  uri: db_path,
  collection: "sessions",
});

const port = process.env.PORT || 3000;

store.on("error", function (error) {
  console.error("Session store error:", error);
});

// Multer setup
const RandomString = (length) => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "uploads");
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, RandomString(10) + "-" + file.originalname);
  },
});

const multerOption = {
  storage,
  fileFilter,
};

// Middleware setup
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(multer(multerOption).single("image"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "e-commerce site",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: false, // must be true if using HTTPS
      httpOnly: true, // prevents JS access
    },
  }),
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(authRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(cartRoutes);

mongoose
  .connect(db_path)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
