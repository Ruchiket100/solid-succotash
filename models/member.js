import mongoose from "mongoose";

const CommitteeMemberSchema = new mongoose.Schema({
    externalId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  firstName: {
    type: String,
    required: true,
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
  address: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
    default: [],
  },
  memberSince: {
    type: Date,
    required: true,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const CommitteeMember = mongoose.model('CommitteeMember', CommitteeMemberSchema);

export default CommitteeMember;