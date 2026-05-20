const axios = require("axios");

const getPopularMoviesService = async (page = 1) => {
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular",
        {
            params: {
                api_key: process.env.TMDB_api_Key,
                page,
            },
        }
    );

    return response.data.results;
};

module.exports = {
    getPopularMoviesService,
};