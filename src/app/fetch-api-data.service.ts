import { Injectable } from '@angular/core';
import { catchError } from "rxjs";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";

//Declaring the API URL that will provide data for the client app
const apiUrl = "https://myflix--movies-application1.herokuapp.com/";
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // User registration
  /**
   * @service POST to the respective endpoint of apiUrl to register a new user
   * @param {any} userDetails
   * @returns a new user object in json format
   * @function userRegistration
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  // User login
  /**
   * @service POST to the respective endpoint of apiUrl to login a user
   * @param {any} userDetails
   * @returns a user object in json format
   * @function userLogin
   */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  // Get all movies
  /**
   * @service GET to the respective endpoint of apiUrl to get all movies
   * @returns an array of all movies in json format
   * @function getAllMovies
   */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get one movie
  /**
   * @service GET to the respective endpoint of apiUrl to get a movie by title
   * @param {string} Title
   * @returns an array of movie objects in json format
   * @function getOneMovie
   */

  getOneMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/${Title}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get director
  /**
   * @service GET to the respective endpoint of apiUrl to get director info
   * @param {string} directorName
   * @returns an array of movie objects in json format
   * @function getDirector
   */

  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/directors/${directorName}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get genre
  /**
   * @service GET to the respective endpoint of apiUrl to get genre info
   * @param {string} genreName
   * @returns an array of movie objects in json format
   * @function getGenre
   */

  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}movies/genre/${genreName}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Get user
  /**
   * @service GET to the respective endpoint of apiUrl to get a specific user
   * @returns a user object in json format
   * @function getUser
   */

  getUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Add a movie to favourite Movies
  /**
   * @service POST to the respective endpoint of apiUrl to add a movie to a user's favourites
   * @returns a user object in json format
   * @function addFavoriteMovie
   */

  addFavoriteMovie(MovieID: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .post(
        `${apiUrl}users/${username}/movies/${MovieID}`,
        { FavoriteMovie: MovieID },
        {
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Edit user
  /**
   * @service PUT to the respective endpoint of apiUrl to update a user's details
   * @returns a user object in json format
   * @function editUser
   */

  editUser(updatedUser: any): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .put(`${apiUrl}users/${username}`, updatedUser, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Delete user
  /**
   * @service DELETE to the respective endpoint of apiUrl to delete a user
   * @returns success message
   * @function deleteUser
   */

  deleteUser(): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Remove a movie from the favourite movies
  /**
   * @service DELETE to the respective endpoint of apiUrl to remove a movie from a user's favourites
   * @returns a user object in json format
   * @function removeFavoriteMovie
   */

  removeFavoriteMovie(MovieID: string): Observable<any> {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}users/${username}/movies/${MovieID}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Non-typed response extraction
  /**
   * Extracts response data from HTTP response
   * @param res
   * @returns response body or empty object
   */

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Error handler
  /**
   * Error handler
   * @param error
   * @returns error message
   */

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(() => new Error("Something not right; please try again later"));
  }
  
}


