import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { ACCESS_TOKEN_SECRET } = process.env;

export const createToken = async (email, password) => {
  console.log("hier1");
  return await jwt.sign({ email, password }, ACCESS_TOKEN_SECRET, {
    expiresIn: "120m",
  });
};

export const checkToken = async () => {
  console.log("hier2");
  return await jwt.verify(token, ACCESS_TOKEN_SECRET, (error, payload) => {
    console.log("error & payload:", error, payload);
    if (error) {
      return error;
    } else {
      return payload;
    }
  });
};
