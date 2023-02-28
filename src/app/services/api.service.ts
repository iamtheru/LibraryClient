import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookItem } from '../models/book-item';

@Injectable()
export class ApiService {
	constructor(
		private _http: HttpClient,
	) { }

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	private formatErrors(error: any) {
		return throwError(error.error);
	}

	get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
		console.log(params.keys());
		return this._http.get(`${environment.api_url}${path}`, { params })
			.pipe(catchError(this.formatErrors));
	}

	getBooks(path: string, params: HttpParams = new HttpParams()): Observable<[BookItem]> {
		console.log(params.keys());
		return this._http.get<[BookItem]>(`${environment.api_url}${path}`, { params });
	}

	put(path: string, body: Object = {}): Observable<any> {
		return this._http.put(
			`${environment.api_url}${path}`,
			JSON.stringify(body),
			this.httpOptions
		).pipe(catchError(this.formatErrors));
	}

	post(path: string, body: Object = {}): Observable<any> {
		return this._http.post(
			`${environment.api_url}${path}`,
			JSON.stringify(body),
			this.httpOptions
		).pipe(catchError(this.formatErrors));
	}

	delete(path: string): Observable<any> {
		return this._http.delete(
			`${environment.api_url}${path}`
		).pipe(catchError(this.formatErrors));
	}
}