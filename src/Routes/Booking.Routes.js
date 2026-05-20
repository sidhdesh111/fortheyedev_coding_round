const express = require("express");
const authMiddleware = require("../Middleware/authMiddleware");
const { bookMovieController, getMyBookingsController, rescheduleBookingController, cancelBookingController } = require("../Controller/Booking.controller");
const BookingRouter = express.Router();



BookingRouter.post("/", authMiddleware, bookMovieController);


BookingRouter.get("/", authMiddleware, getMyBookingsController);


BookingRouter.put("/:id/reschedule", authMiddleware, rescheduleBookingController);



module.exports = BookingRouter;
