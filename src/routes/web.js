import express from "express";
import homepageController from "../controllers/homepageController";

let router = express.Router();

let initWebRoutes = (app) => {
    // Route hiển thị trang chính
    router.get("/", homepageController.getHomepage);

    // Route xử lý đăng nhập
    router.post("/login", homepageController.handleLogin);

    // Route để lấy dữ liệu từ Google Sheet
    router.get("/excel", homepageController.getGoogleSheet);

    return app.use("/", router);
};

module.exports = initWebRoutes;
