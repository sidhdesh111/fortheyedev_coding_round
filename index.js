require("dotenv").config();
const app = require("./src/app");
const DBconnect = require("./Config/DB");
const errorHandler = require("./src/Utils/ErrorHandler");
const UserRoutes = require("./src/Routes/User.Routes");
const MoviesRoutes = require("./src/Routes/Movies.Routes");
const BookingRouter = require("./src/Routes/Booking.Routes");



const PORT = parseInt(process.env.PORT, 10) || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
app.get("/", (req, res) => {
    res.send("App is running...");
});

app.use("/api/auth", UserRoutes);
app.use("/api/movies", MoviesRoutes);
app.use("/api/bookings", BookingRouter);

app.use((req, res) => {
    res.status(404).json({
        error: true,
        success: false,
        message: "Route not found",
    });
});

app.use(errorHandler);

DBconnect();

