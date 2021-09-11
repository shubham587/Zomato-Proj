// importing env variables
require("dotenv").config();

// libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";

// microservice routes
import Auth from "./API/Auth";

// database connection
import ConnectDB from "./database/connection";

const zomato = express();

// // apllication middleware
zomato.use(express.json());
zomato.use(express.urlencoded({ extended : false}));
zomato.use(helmet()); 
// helmet is used for security purpose
zomato.use(cors());
// cors is used to allow other api.

// application routes 
zomato.use("/auth", Auth);

zomato.get("/", (request,response) => response.json({ message : "Setup success"}));

zomato.listen(1000, () => 
ConnectDB()
.then( () =>console.log("Server is running"))
.catch(() => console.log("Server is running, but database connection failed"))
);

