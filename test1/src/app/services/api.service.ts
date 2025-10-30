import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Movie } from "../interfaces/interfaces";

@Injectable({
    providedIn: "root"
})
export class ApiService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3001';

    // GET all films
    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiUrl}/movies?_sort=title`)
    }

    // GET by ID
    getMovie(id: string): Observable<Movie> {
        return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`);
    }

    // GET by title
    getMoviesByTitle(title_filter: string): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiUrl}/movies?title_like=${title_filter.toLowerCase()}&_sort=title`);
    }




}