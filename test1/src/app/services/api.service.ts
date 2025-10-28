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
    getFilms(): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiUrl}/movies`)
    }

    // GET by ID
    getFilm(id: string): Observable<Movie> {
        return this.http.get<Movie>(`${this.apiUrl}/movies/${id}`);
    }



}