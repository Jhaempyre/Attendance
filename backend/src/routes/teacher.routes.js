import { Router } from "express";
import { registerTeacher } from "../controllers/teachers.controllers.js";
const router = Router()

router.route("/addTeacher").post(registerTeacher)

export default router