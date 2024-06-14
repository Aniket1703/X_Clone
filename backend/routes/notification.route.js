import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { deletNotification, deletNotifications, getNotifications } from "../controllers/notification.controller.js";

const router = express.Router();


router.get("/",protectRoute,getNotifications);
router.delete("/",protectRoute,deletNotifications);
router.delete("/:id",protectRoute,deletNotification);

export default router;