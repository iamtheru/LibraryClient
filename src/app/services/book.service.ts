import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { BookPostModel } from '../models/book-post-model';
import { BookItem } from '../models/book-item';
import { HttpParams } from '@angular/common/http';
import { BookDetails } from '../models/book-details';
import { PostResponce } from '../models/postResponse';

@Injectable()
export class BookService {
	constructor(
		private _apiService: ApiService
	) { }

	getAll(sortorder: string = 'Title'): Observable<BookItem[]> {
		let params = new HttpParams().set('order', sortorder);

		return this._apiService.getBooks('/books', params);
	}

	getRecomemdedBooks(genre: string = 'Classic'): Observable<BookItem[]> {
		let params = new HttpParams().set('genre', genre);

		return this._apiService.getBooks('/recommended', params);
	}

	getBook(id: number): Observable<BookDetails> {
		return this._apiService.get(`/books/${id}`);
	}

	saveBook(book: BookPostModel): Observable<PostResponce> {
		return this._apiService.post('/books/save', book).pipe(map(data => data));
	}
}