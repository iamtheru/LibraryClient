import { Component, Input, } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BookListItemComponent } from '../book-list-item/book-list-item.component';
import { BookDetails } from '../models/book-details';
import { BookService } from '../services/book.service';

@Component({
	selector: 'app-view-book',
	templateUrl: './view-book.component.html',
	styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent {
	@Input() bookId!: number;
	book!: BookDetails;

	constructor(
		private _bookService: BookService,
		public dialogRef: MatDialogRef<BookListItemComponent>,
	) { }

	ngOnInit(): void {
		this._bookService.getBook(this.bookId)
			.subscribe(r => { this.book = r; this.book.reviewsNumber = this.book.reviews.length; console.log(this.book.cover) });;
	}

	onClose(): void {
		this.dialogRef.close();
	}
}
