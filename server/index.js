//importing env variables
require("dotenv").config();
//libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import passport from "passport";
//microservice routes
//configs
import googleAuthConfig from "./config/google.config";
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
//database connection
import ConnectDB from "./database/connection";
const zomato = express();
//application middlewares
zomato.use(helmet());
zomato.use(cors());
zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configuration
googleAuthConfig(passport);

//App routes

zomato.use("/auth",Auth);
zomato.use("/restaurant",Restaurant);
zomato.use("/food",Food);

zomato.get("/",(req,res)=>res.json({message:"Setup success"}));

 //zomato.listen(4000,()=>ConnectDB().then(()=>console.log("Server is running")).catch((error)=>console.log(error)));
const port = process.env.PORT || 4000;
 zomato.listen(port,()=>ConnectDB().then(()=>console.log("Server is running")).catch(()=>console.log("Server is running but connection with db is not established")));

//zomato.listen(4000,console.log("Server is running"));