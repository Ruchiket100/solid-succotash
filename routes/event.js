import { Router } from "express";
import { addEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../controllers/event.js";

const router = Router();

// get all events
router.get("/", getAllEvents);

// get event by id
router.get("/:id", getEventById);

// create event
router.post("/admin", addEvent);

// update event
router.put("/admin/:id", updateEvent);

// delete event
router.delete("/admin/:id", deleteEvent);

export default router;