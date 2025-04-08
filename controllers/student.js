import Student from "../models/student.js";
import generateId from "../utils/generateId.js";

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error });
  }
};

// Add new student
export const addStudent = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    contact,
    photo,
    birthDate,
    admissionYear,
    passingYear,
    cgpa,
    roles
  } = req.body;

  const externalId = generateId();

  try {
    // Check if student with same email or externalId already exists
    const existing = await Student.findOne({
      $or: [{ email }, { externalId }],
    });

    if (existing) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const newStudent = new Student({
      firstName,
      middleName,
      lastName,
      email,
      contact,
      photo,
      birthDate,
      externalId,
      admissionYear,
      passingYear,
      cgpa,
      roles,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
};