import { MoviesService } from "../services/movies.service";

export interface Role {
    actorName: string;
    roleName: string;
    picture: string;
}

export interface Movie {
    id: string;
    title: string;
    year: string;
    genre: string;
    actors: Role[];
    content: string;
    rating: string;
    cover: string;
}

export interface DialogData {
    mservice: MoviesService
}