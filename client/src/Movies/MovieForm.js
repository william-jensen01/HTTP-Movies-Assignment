import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
}

const MovieForm = (props) => {
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie)
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setMovie(res.data)
        })
        .catch(err => console.log(err));
    }, [id])

    const changeHandler = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value 
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            props.setMovieList(props.movieList.map(movieItem => {
                if (movieItem.id === res.data.id) {
                    return res.data
                } else {
                    return movieItem
                }
            }));
            // setMovie({
            //     title: '',
            //     director: '',
            //     stars: '',
            //     metascore: ''
            // })
            push(`/movies/${id}`)
        })
        .catch(err => console.log(err))
    }
    
    return (
        <div className="updateForm">
            <h2>Update Movie</h2>
            <form onSubmit={submitHandler}>
                {/* title */}
                <input 
                type='text'
                name='title'
                onChange={changeHandler}
                placeholder='Movie Title'
                value={movie.title}
                />

                {/* director */}
                <input
                type='text'
                name='director'
                onChange={changeHandler}
                placeholder='Director'
                value={movie.director}
                />

                {/* metascore */}
                <input
                type='text'
                name='metascore'
                onChange={changeHandler}
                value={movie.metascore}
                />

                {/* stars */}
                {/* <input /> */}

                <button>Update</button>
            </form>
        </div>
    )
};

export default MovieForm;