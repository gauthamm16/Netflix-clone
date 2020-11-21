import React, { useEffect, useState } from 'react';
import './Banner.css';
import axios from '../axios';
import requests from '../requests';



function Banner() {
    const [movie,setMovie] = useState([]);

    useEffect(() =>{
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random() * request.data.results.length)
            ]);
            return request;
        }
        fetchData();
    },[])


    function truncate(str,n){
        return str?.n > n ? str.substr(0,n-1) + "..." : str;
    }
    return (
        <header className="banner" 
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,backgroundSize:"cover",
                backgroundPosition:"center center"}}>


            <div className="banner__contents">
                <h1 className="banner__title">{movie?.original_name || movie?.title || movie?.name}</h1>
                <div className="banner__buttons"> 
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h2 className="banner__description">{truncate(movie.overview,100)}</h2>
            </div>

            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner
