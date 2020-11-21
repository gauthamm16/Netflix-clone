import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from '../axios';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title,fetchURL,isLargeRow}) {
    const [ movies,setMovies ] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchURL]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className={"row__posters"}>
                {movies.map(movie => (
                    <img key={movie.id} className={`row__poster ${isLargeRow && "row__poster__large"}`} src={`${base_url}${isLargeRow ? movie.poster_path :movie.backdrop_path}`}alt={movie.original_name}/>
                ))}
            </div>
        </div>
    )
}

export default Row
