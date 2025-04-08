import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  externalId: {
    type: String,
    required: true,
    unique: true,
  },
  eventExternalId: {
    type: String,
    required: true,
    ref: 'Event',
  },
  studentExternalId: {
    type: String,
    required: true,
    ref: 'Student',
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  additionalInfo: {
    type: String,
  },
}, {
  timestamps: true,
});

const Registration = mongoose.model('Registration', RegistrationSchema);

export default Registration;