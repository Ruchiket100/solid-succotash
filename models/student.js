import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  externalId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  photo: {
    type: String,
    required: true,
    default: "" // URL or path to the image
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  admissionYear: {
    type: Number,
    required: true,
  },
  passingYear: {
    type: Number,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
    min: 0.0,
    max: 10.0,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
  },
  roles: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

const Student = mongoose.model('Student', StudentSchema);

export default Student;