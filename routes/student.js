import { Router } from "express";
import { addStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from "../controllers/student.js";

const router = Router();


//get all students (add filters)
router.get("/student", getAllStudents)

//add new student
router.post("/student", addStudent)

//get student by id
router.get("/student/:id", getStudentById)

//update student by id
router.put("/student/:id", updateStudent)

//delete student by id
router.delete("/student/:id", deleteStudent)


export default router;