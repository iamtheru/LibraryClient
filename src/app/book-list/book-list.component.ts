import { Component, EventEmitter, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BookListItemComponent } from '../book-list-item/book-list-item.component';
import { ComponentDTO } from '../models/componentDTO';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
	@ViewChildren(BookListItemComponent) childComponents!: QueryList<BookListItemComponent>;
	@Output() bookSelected = new EventEmitter<ComponentDTO>();

	onBookSelected(dto: ComponentDTO): void {
		this.bookSelected.emit(dto);
	}

	formSubmit(dto: ComponentDTO): void {
		let tabId = dto === undefined ? 0 : dto.tabId;
		
		this.childComponents.forEach(element => {
			if(element.tabIndex === tabId){
				element.initBooks();
				return;
			}
		});
	}
}
