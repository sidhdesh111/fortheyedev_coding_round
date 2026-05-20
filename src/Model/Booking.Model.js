const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    movieId: {
      type: Number,
      required: true,
    },

    movieTitle: {
      type: String,
      required: true,
      trim: true,
    },

    bookingDate: {
      type: Date,
      required: true,
    },

    showTime: {
      type: String,
      required: true,
    },

    seats: [
      {
        type: String,
        required: true,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed", "expired"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    cancelledAt: {
      type: Date,
      default: null,
    },

    rescheduledCount: {
      type: Number,
      default: 0,
      max: 3,
    },
  },
  {
    timestamps: true,
  },
);

const BookingModel = mongoose.model("Booking", bookingSchema);
module.exports = BookingModel;
