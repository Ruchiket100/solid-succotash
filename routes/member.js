import { Router } from "express";
import { addMember, deleteMember, getAllMembers, getMemberById, updateMember } from "../controllers/member.js";

const router = Router();

//get all members (add filters)
router.get("/member", getAllMembers)

//add new member
router.post("/member", addMember)

//get member by id
router.get("/member/:id", getMemberById)

//update member by id
router.put("/member/:id", updateMember)

//delete member by id
router.delete("/member/:id", deleteMember )

export default router;