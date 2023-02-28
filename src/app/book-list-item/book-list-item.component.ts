import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BookItem } from '../models/book-item';
import { ComponentDTO } from '../models/componentDTO';
import { BookService } from '../services/book.service';
import { ViewBookComponent } from '../view-book/view-book.component';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.css']
})
export class BookListItemComponent {
	@Output() bookSelected = new EventEmitter<ComponentDTO>();
	@Input() inputData: any;
	@Input() tabIndex!: number;

	imgTemp = "data:image/jpg;base64,";
	books!: BookItem[];

	constructor(
		private _bookService: BookService,
		public _dialog: MatDialog,
		) {}

	ngOnInit(): void {
		
		this.initBooks();
	}

	initBooks() {
		this.getBooks(this.tabIndex)
		.subscribe(r => this.books = r);
	}

	getBooks(tabIndex: number): Observable<BookItem[]>{

		switch (tabIndex) {
			case 0:
				return this._bookService.getAll();
			case 1:
				return this._bookService.getRecomemdedBooks();
			default:
				return this._bookService.getAll();
		}
	}


	editBook(id: number): void {
		let dto = new ComponentDTO();
		dto.bookId = id;
		dto.tabId = this.tabIndex;

		this.bookSelected.emit(dto);
	}

	viewBook(bookId: number): void {
		console.log(bookId);
		const dialogRef = this._dialog.open(ViewBookComponent,{
			backdropClass: 'dialog-backdrop',
			panelClass: 'dialog-panel',
			hasBackdrop: true,
		});
		dialogRef.componentInstance.bookId = bookId;
	}
}
