const movies = [
    {
      title: "3 Idiots",
      genre: "Comedy-Drama",
      year: 2009,
    },
    {
      title: "Dangal",
      genre: "Sports-Drama",
      year: 2016,
    },
    {
      title: "Interstellar",
      genre: "Science Fiction",
      year: 2014,
    },
  ];
  
  function getMovieDetails(title) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const movie = movies.find((item) => item.title === title);
  
        if (!movie) {
          reject(new Error(`Movie not found: ${title}`));
          return;
        }
  
        resolve(movie);
      }, 1000);
    });
  }
  
  async function showMoviesInSequence() {
    try {
      const firstMovie = await getMovieDetails("3 Idiots");
      console.log("First movie:", firstMovie);
  
      const secondMovie = await getMovieDetails("Dangal");
      console.log("Second movie:", secondMovie);
  
      const thirdMovie = await getMovieDetails("Interstellar");
      console.log("Third movie:", thirdMovie);
    } catch (error) {
      console.error("Movie error:", error.message);
    }
  }
  
  showMoviesInSequence();