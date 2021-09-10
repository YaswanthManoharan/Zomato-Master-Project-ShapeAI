//importing env variables
require("dotenv").config();
//libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
//microservice routes

import Auth from "./API/Auth";

//database connection
import ConnectDB from "./database/connection";
const zomato = express();
//application middlewares
zomato.use(helmet());
zomato.use(cors());
zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));

//App routes

zomato.use("/auth",Auth);
zomato.get("/",(req,res)=>res.json({message:"Setup success"}));

 //zomato.listen(4000,()=>ConnectDB().then(()=>console.log("Server is running")).catch((error)=>console.log(error)));
const port = process.env.PORT || 4000;
 zomato.listen(port,()=>ConnectDB().then(()=>console.log("Server is running")).catch(()=>console.log("Server is running but connection with db is not established")));

//zomato.listen(4000,console.log("Server is running"));