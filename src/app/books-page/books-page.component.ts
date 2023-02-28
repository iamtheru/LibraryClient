import { Component, ViewChild } from '@angular/core';
import { BookListComponent } from '../book-list/book-list.component';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { ComponentDTO } from '../models/componentDTO';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent {
	@ViewChild('myForm', { static: true }) formComponent!: EditBookComponent;
	@ViewChild('listComponent', { static: true }) listComponent!: BookListComponent;

	constructor(
	){}

	onBookSelected(dto: ComponentDTO): void {
		this.formComponent.initForm(dto);
	}

	onFormSubmit(dto: ComponentDTO) :void {
		this.listComponent.formSubmit(dto);
	}
}
