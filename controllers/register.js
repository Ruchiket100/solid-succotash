import Registration from "../models/register.js";
import Student from "../models/student.js";
import Event from "../models/event.js";
import generateId from "../utils/generateId.js";

// Get all registrations
export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations', error });
  }
};

export const updateRegistration = async (req, res) => {
  const { externalId } = req.params;
  const updateData = req.body;

  try {
    const existing = await Registration.findOne({ externalId });

    if (!existing) {
      return res.status(404).json({ message: "Registration not found" });
    }

    const updated = await Registration.findOneAndUpdate(
      { externalId },
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating registration", error });
  }
};

// Register a student for an event
export const registerForEvent = async (req, res) => {
  const { studentExternalId, eventExternalId, additionalInfo } = req.body;

  try {
    const event = await Event.findOne({ externalId: eventExternalId });
    const student = await Student.findOne({ externalId: studentExternalId });

    if (!event || !student) {
      return res.status(404).json({ message: 'Student or Event not found' });
    }

    const existing = await Registration.findOne({ studentExternalId, eventExternalId });
    if (existing) {
      return res.status(400).json({ message: 'Student already registered for this event' });
    }

    const newRegistration = new Registration({
      externalId: generateId(),
      eventExternalId,
      studentExternalId,
      additionalInfo,
    });

    const saved = await newRegistration.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Error registering for event', error });
  }
};

export const getRegistrationById = async (req, res) => {
  const { externalId } = req.params;

  try {
    const registration = await Registration.findOne({ externalId });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    res.status(200).json(registration);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registration", error });
  }
};


// Get registrations by eventExternalId
export const getRegistrationsByEvent = async (req, res) => {
  const { eventExternalId } = req.params;
  try {
    const registrations = await Registration.find({ eventExternalId });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations', error });
  }
};

// Get registrations by studentExternalId
export const getRegistrationsByStudent = async (req, res) => {
  const { studentExternalId } = req.params;
  try {
    const registrations = await Registration.find({ studentExternalId });
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations', error });
  }
};

// Delete registration
export const deleteRegistration = async (req, res) => {
  const { externalId } = req.params;
  try {
    const registration = await Registration.findOne({ externalId });
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    await Registration.deleteOne({ externalId });
    res.status(200).json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting registration', error });
  }
};
