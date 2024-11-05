require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";

let app = express();

// Middleware để thiết lập CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Sử dụng body-parser để xử lý dữ liệu POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình view engine
configViewEngine(app);

// Khởi tạo tất cả các route
initWebRoutes(app);

let port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`App is running at the port ${port}`);
});
