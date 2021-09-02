import express from "express";
import cors from "cors";
import helmet from "helmet";

const zomato = express();

// // apllication middleware
zomato.use(express.json());
zomato.use(express.urlencoded({ extended : false}));
zomato.use(helmet()); 
// helmet is used for security purpose
zomato.use(cors());
// cors is used to allow other api.

zomato.get("/", (request,response) => response.json({ message : "Setup success"}));

zomato.listen(6000, () => console.log("Server is running"));

