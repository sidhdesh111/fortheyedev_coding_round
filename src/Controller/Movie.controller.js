const { getPopularMoviesService } = require("../Service/FetchMovieData");

const getMovieListController = async (req, res, next) => {
    try {
        const page = Number(req.query.page) || 1;

        const movies = await getPopularMoviesService(page);

        const formattedMovies = movies.map((movie) => ({
            movieId: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            rating: movie.vote_average,
            language: movie.original_language,
            overview: movie.overview,
        }));

        return res.status(200).json({
            error: false,
            success: true,
            message: "Movies fetched successfully",
            currentPage: page,
            data: formattedMovies,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = getMovieListController;
