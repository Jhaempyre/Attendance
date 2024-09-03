import { Router } from "express";
import { loginTeacher, registerTeacher } from "../controllers/teachers.controllers.js";
const router = Router()

router.route("/addTeacher").post(registerTeacher)
router.route("/loginTech").post(loginTeacher)

export default router