import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        const notification = await Notification.find({ to: userId }).populate({
            path: "from",
            select: "username profileImg"
        });
        await Notification.updateMany({ to: userId }, { read: true });

        res.status(200).json(notification);

    } catch (error) {
        console.log("Error in getNotifications function : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


export const deletNotifications = async (req, res) => {
    try {
        const userId = req.user._id;

        await Notification.deleteMany({ to: userId });

        res.status(200).json({ message: "Notifications deleted successfully" });

    } catch (error) {
        console.log("Error in deletNotifications function : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deletNotification = async (req, res) => {
    try {
        const userId = req.user._id;
        const notificationId = req.params.id;

        const notification = await Notification.findById(notificationId);

        if (!notification) {
            res.status(404).json({ error: "Notification Not Found" });
        }

        if (notification.to.toString() !== userId.toString()) {
            res.status(403).json({ error: "You are not Allowed to Delete this Notification" });
        }
        await Notification.findByIdAndDelete(notificationId);

        res.status(200).json({ message: "Notification Deleted Successfully" });
    } catch (error) {
        console.log("Error in deletNotification function : ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}