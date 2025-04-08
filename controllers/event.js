import Event from "../models/event.js";
import generateId from "../utils/generateId.js";


// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Get event by externalId
export const getEventById = async (req, res) => {
  const { externalId } = req.params;
  try {
    const event = await Event.findOne({ externalId });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

// Add new event
export const addEvent = async (req, res) => {
  const {
    title,
    description,
    venue,
    date,
    time,
    poster,
    attendees,
    tags
  } = req.body;

  const externalId = generateId()

  try {
    const existing = await Event.findOne({ externalId });

    if (existing) {
      return res.status(400).json({ message: 'Event with this externalId already exists' });
    }

    const newEvent = new Event({
      externalId,
      title,
      description,
      venue,
      date,
      time,
      poster,
      attendees,
      tags,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding event', error });
  }
};

// Update event by externalId
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const event = await Event.findOne({ externalId : id });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const updatedEvent = await Event.findOneAndUpdate(
      { externalId : id },
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Delete event by externalId
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findOne({ externalId : id });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await Event.deleteOne({ externalId: id });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};
