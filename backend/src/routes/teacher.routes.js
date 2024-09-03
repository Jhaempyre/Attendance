import { Router } from "express";
import { loginTeacher, logOutTeacher, registerTeacher } from "../controllers/teachers.controllers.js";
import { authVerify } from "../middlewares/auth.middlewares.js";
const router = Router()

router.route("/addTeacher").post(registerTeacher)
router.route("/loginTech").post(loginTeacher)
router.route("/logoutTech").post(authVerify,logOutTeacher)

export default router