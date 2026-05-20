const Booking = require("../Model/Booking.Model");

const bookMovieController = async (req, res, next) => {
    try {
        const { movieId, movieTitle, bookingDate, showTime, seats, totalAmount } = req.body;

        if (!movieId || !movieTitle || !bookingDate || !showTime || !seats || !totalAmount) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "movieId, movieTitle, bookingDate, showTime, seats, and totalAmount are required",
            });
        }

        const booking = await Booking.create({
            user: req.user._id,
            movieId,
            movieTitle,
            bookingDate,
            showTime,
            seats,
            totalAmount,
            bookingStatus: "confirmed",
            paymentStatus: "paid",
        });

        res.status(201).json({
            error: false,
            success: true,
            message: "Movie booked successfully",
            data: booking,
        });
    } catch (error) {
        next(error);
    }
};

const getMyBookingsController = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 }).populate("user", "name email");

        res.status(200).json({
            error: false,
            success: true,
            message: "Bookings retrieved successfully",
            data: bookings,
        });
    } catch (error) {
        next(error);
    }
};

const rescheduleBookingController = async (req, res, next) => {
    try {
        const { bookingDate, showTime } = req.body; 
        const booking_id = req.params.id;   
        const booking = await Booking.findById(booking_id);

        if (!booking) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "Booking not found",
            });
        }

        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                error: true,
                success: false,
                message: "Unauthorized access",
            });
        }

        if (["cancelled", "completed"].includes(booking.bookingStatus)) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "This booking cannot be rescheduled",
            });
        }

        if (booking.rescheduledCount >= 3) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Reschedule limit exceeded",
            });
        }

        if (!bookingDate && !showTime) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "bookingDate or showTime is required to reschedule",
            });
        }

        if (bookingDate) booking.bookingDate = bookingDate;
        if (showTime) booking.showTime = showTime;

        booking.rescheduledCount += 1;

        await booking.save();

        res.json({
            error: false,
            success: true,
            message: "Booking rescheduled successfully",
            data: booking,
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    bookMovieController,
    getMyBookingsController,
    rescheduleBookingController,
};