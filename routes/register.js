import { Router } from "express";
import {  deleteRegistration, getAllRegistrations, getRegistrationById, registerForEvent, updateRegistration } from "../controllers/register.js";

const router = Router();

// get all users (add filter for getting users based on event id)
router.get("/admin", getAllRegistrations);

// get registeration data by id   
router.get("/:id", getRegistrationById);

// create registration
router.post("/" , registerForEvent)

// update registeration
router.put("/admin/:id", updateRegistration);

router.delete("/admin/:id", deleteRegistration);

export default router;