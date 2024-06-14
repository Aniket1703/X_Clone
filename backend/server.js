import path from "path";
import express from  "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";

import authRoute from "./routes/auth.route.js";
import userRoute from  "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import notificationRoute from "./routes/notification.route.js";

import connectMongoDB from "./db/connectMongoDB.js" 

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(cookieParser());


app.use("/api/auth",authRoute);
app.use("/api/user",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/notifications",notificationRoute);


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
    connectMongoDB();
})

