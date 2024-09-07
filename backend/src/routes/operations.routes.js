import { Router } from "express";
import { addBranch, addSection, addStudent, addSubejct, addYear, getStudentsBySection} from "../controllers/teachers.controllers.js";
import { authVerify } from "../middlewares/auth.middlewares.js";

const router = Router()


router.route("/addBranch").post(authVerify,addBranch)
router.route("/addSection").post(authVerify,addSection)
router.route("/addSubejct").post(authVerify,addSubejct)
router.route("/addStudent").post(authVerify,addStudent)
router.route("/addYear").post(authVerify,addYear)
router.route("/section/:sectionId").get(authVerify,getStudentsBySection)



export default router


