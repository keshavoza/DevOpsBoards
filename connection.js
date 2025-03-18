import { dbobj } from "./config.js";
import sql from "mysql2";
import { cloudobj } from "./config.js";
import { v2 as cloudinary } from "cloudinary";

export const db = sql.createPool(dbobj);

export const Cloudinary =  cloudinary.config(cloudobj);

