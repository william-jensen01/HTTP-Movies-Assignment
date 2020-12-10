import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import MovieList from './MovieList';

const initialMovie = {
    title: '',
    director: '',
    stars: '',
    metascore: ''
}

const AddMovie = (props) => {
    const { push } = useHistory();
    const { id } = useParams();
    const [ movie, setMovie ] = useState(initialMovie);

    const changeHandler = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies`, movie)
        .then(res => {
            props.setMovieList([...props.MovieList, res.data]);
            setMovie(initialMovie);
            push(`/movies/${res.data.id}`)
        })
        .catch(err => console.log(err))
    };

    return (
        <div className='add-movie'>
            <h2>Add Movie</h2>
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
                placeholder='Metascore'
                value={movie.metascore}
                />

                {/* stars */}
                <input
                type='text'
                name='stars'
                onChange={changeHandler}
                placeholder='Stars'
                value={movie.stars}
                />

                <button>Add</button>
            </form>
        </div>
    )
}

export default AddMovie;