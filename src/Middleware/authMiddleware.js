const jwt = require("jsonwebtoken");
const asyncHandler = require("../Utils/asyncHandler");
const ApiError = require("../Utils/ApiError");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }



    if (!token) {
        throw new ApiError(401, "Access token is required");
    }

    const decoded = jwt.verify(token, process.env.JWT_Secret_key);

    req.user = {
        _id: decoded._id ?? decoded.id,
        email: decoded.email,
    };

    next();
});

module.exports = authMiddleware;