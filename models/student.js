import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  seatNumber: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

const Student = mongoose.model('Student', StudentSchema);

export default Student;