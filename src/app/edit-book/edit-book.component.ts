import { Component, ElementRef, EventEmitter, Injectable, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { BookDetails } from '../models/book-details';
import { ComponentDTO } from '../models/componentDTO';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})

@Injectable()
export class EditBookComponent {
	@ViewChild('fileInput') fileInput!: ElementRef;
	@Output() formSubmit = new EventEmitter<ComponentDTO>();

	book?: BookDetails;
	bookForm!: FormGroup;
	cover: any;
	fileName?: string;
	dto!: ComponentDTO;

  constructor(
	private _bookService: BookService,
	private _formBuilder: FormBuilder,
	){
		this.bookForm = this.getGorm();
		console.log('MyComponent constructor called');
	}

	submitForm(){
		var book = Object.assign({}, this.bookForm.value);
		book.cover = this.cover;
		this._bookService.saveBook(book).subscribe(r => 
			{
				if(r.id > 0){
					this.formSubmit.emit(this.dto);
				}
			});
	}

	handleUpload(files: FileList) {
		if (files.length > 0) {
		const file = files.item(0);
		this.fileName = file?.name;

		const reader = new FileReader();
		reader.readAsDataURL(file as Blob);
		reader.onload = () => {
			this.cover = reader.result;
			};
		}
	}

	clearFile() {
		this.fileName = '';
		this.fileInput.nativeElement.value = '';
		this.bookForm.controls['cover'].setValue('');
		this.cover = null;
	}

	initForm(dto: ComponentDTO): void{
		this.dto = dto;
		this._bookService.getBook(dto.bookId)
		.subscribe(r => {this.book = r; this.bookForm = this.getGorm();});
	}

	public resetForm(){
		this.bookForm.reset()
		this.bookForm = this.getFormGroup();
	}

	private getFormGroup()  : FormGroup{
		let form! : FormGroup;

		if(this.book){
			let tempbook = Object.assign({}, this.book);
			this.book = undefined;
			form = this.getGorm();
			this.book = Object.assign({}, tempbook );
		}

		return form;
	}

	private getGorm() : FormGroup{
		return this._formBuilder.group({
			title: new FormControl(this.book?.title === null ? '' : this.book?.title , [Validators.required, Validators.minLength(2)]),
			cover: new FormControl('', Validators.required),
			genre: new FormControl(this.book?.genre === null ? '' : this.book?.genre, [Validators.required]),
			author: new FormControl(this.book?.author === null ? '' : this.book?.author, [Validators.required, Validators.minLength(4)]),
			content: new FormControl(this.book?.content === null ? '' : this.book?.content,[Validators.required, Validators.minLength(10)])
		});
	}
}
