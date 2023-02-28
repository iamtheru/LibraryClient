import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BookService } from './services/book.service';
import { BooksPageComponent } from './books-page/books-page.component';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog, MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';


@NgModule({
	declarations: [
		AppComponent,
		BookListComponent,
		BookListItemComponent,
		EditBookComponent,
		ViewBookComponent,
		BooksPageComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgMaterialModule,
		ReactiveFormsModule,
		HttpClientModule,
		MatDialogModule,
	],
	providers: [
		BookService,
		BookListComponent
		, ApiService,
		{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
		MatDialog,
		BookListItemComponent,
		EditBookComponent
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
