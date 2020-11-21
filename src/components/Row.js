import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from '../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title,fetchURL,isLargeRow}) {
    const [ movies,setMovies ] = useState([]);
    const [ trailerUrl,setTrailerUrl] = useState("");

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchURL]);

    const handleClick = (movie) =>{
        console.log(movie);
        if(trailerUrl){
            setTrailerUrl('');
        }
        else {
            movieTrailer(movie?.original_name|| movie?.name || movie?.title || "").then((url) => {
                console.log(url);
                // const urlParams = new URLSearchParams(new URL(url).search);
                // console.log(urlParams);
                // setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error));
        }
    }

    const opts = {
        height:"390",
        width:"100%",
        playerVars:{
            // "https://developers.google.com/youtube/player_parameters/",
            autoplay:"1",
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className={"row__posters"}>
                {movies.map(movie => (
                    <img onClick={() => handleClick(movie)} key={movie.id} className={`row__poster ${isLargeRow && "row__poster__large"}`} src={`${base_url}${isLargeRow ? movie.poster_path :movie.backdrop_path}`}alt={movie.original_name}/>
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
