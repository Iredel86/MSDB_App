import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieAPI from '../../common/apis/MovieAPI';
import {APIKey} from "../../common/apis/MovieAPIKey";


export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies', 
    async (term) => {
      const response =  await movieAPI.get
      (`?apiKey=${APIKey}&s=${term}&type=movie`);
    return response.data;  
});

export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows', 
    async (term) => {
      const response =  await movieAPI.get
      (`?apiKey=${APIKey}&s=${term}&type=series`);
    return response.data;  
});

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    'movies/fetchAsyncMovieOrShowDetail', 
    async (id) => {
      const response =  await movieAPI.get
      (`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;  
});

const initialState = {
    movies:{},
    shows:{},
    selectMovieOrShow: {}
}

const movieSlice = createSlice({
    name:"movies",
    initialState,
    reducers:{
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () =>{
            console.log("Pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, {payload}) =>{
            console.log("Fetched successfully!");
            return {...state, movies: payload};
        },
        [fetchAsyncMovies.rejected]: () =>{
            console.log("Rejected");
        },
        [fetchAsyncShows.fulfilled]: (state, {payload}) =>{
            console.log("Fetched successfully!");
            return {...state, shows: payload};
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, {payload}) =>{
            console.log("Fetched successfully!");
            return {...state, selectMovieOrShow: payload};
        },
    },
})

export const {removeSelectedMovieOrShow} = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;