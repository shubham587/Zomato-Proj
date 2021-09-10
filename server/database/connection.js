require("dotenv").config();

import mongoose from "mongoose";

export default async () => {
  return mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

console.log(process.env.URL, "subag")