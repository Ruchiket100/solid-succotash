import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
   externalId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // e.g., "10:00 AM - 2:00 PM"
    required: true,
  },
  poster: {
    type: String, // URL to image/poster
    required: false,
  },
  attendees: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', EventSchema);

export default Event;