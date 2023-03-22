import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBookComponent } from '../../components/form-book/form-book.component';
import { sortBookBy } from '../../functions/functions';
import { Book } from '../../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _bookListMessageSource = new BehaviorSubject<Book[]>([]);
  bookList$: Observable<Book[]> = this._bookListMessageSource.asObservable();

  constructor(private _dialog: MatDialog) { }

  setBookList(bookList: Book[]) {
    this._bookListMessageSource.next(bookList);
  }

  getBookList() {
    return this._bookListMessageSource.value;
  }

  modifyBook(modifiedBook: Book) {
    const bookList: Book[] = this.getBookList().map(book => book.id === modifiedBook.id ? book = { ...modifiedBook } : book);
    this.setBookList(bookList);
  }

  deleteBook(bookId: string) {
    const bookList: Book[] = this.getBookList().filter(book => book.id !== bookId);
    this.setBookList(bookList);
  }

  sortBookList(sortByOption: string) {
    const bookList = this.getBookList();
    bookList.sort(sortBookBy(sortByOption));
    this.setBookList(bookList);
  }

  openBookDialog(event: { actionType: string, book: Book | undefined }) {
    const dialogRef = this._dialog.open(FormBookComponent, { data: event });
    return dialogRef.afterClosed();
  }
}
