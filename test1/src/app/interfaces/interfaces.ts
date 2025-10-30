import { MoviesService } from "../services/movies.service";

export interface Movie {
    id: string;
    title: string;
    year: string;
    genre: string;
    actors: string[];
    content: string;
    rating: string;
    cover: string;
}

export interface DialogData {
    mservice: MoviesService
}