import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorService } from 'src/app/http-services/author.service';
import { APP_CONSTANTS } from 'src/app/shared/constants/contants';
import { generateUniqueId, unsubscribe } from 'src/app/shared/functions/functions';
import { Author } from 'src/app/shared/models/author.model';
import { Book } from 'src/app/shared/models/book.model';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  author!: Author;
  bookList: Book[] = [];
  sortbyOptions = APP_CONSTANTS.sortByOptions;
  selectedSortByOption!: string;
  getAuthorSubs!: Subscription;
  getBookListSubs!: Subscription;

  constructor(private _authorService: AuthorService, private _commonService: CommonService) { }

  ngOnInit(): void {
    this.getAuthorSubs = this._authorService.getAuthor().subscribe((responseData) => this.handleGetAuthorResponse(responseData));
    this.subscribeBookList();
  }

  handleGetAuthorResponse(responseData: any) {
    if (responseData && responseData.data) {
      this.author = { ...responseData.data };

      // Get BookList and generate unique id property which can be used for CRUD operations
      const books: Book[] = [...responseData.data.books];
      books.map((book: Book) => book.id = generateUniqueId());
      this._commonService.setBookList(books);
    }
  }

  // Subscribe to Book List from common service
  subscribeBookList() {
    this.getBookListSubs = this._commonService.bookList$.subscribe((bookList: Book[]) => this.bookList = [...bookList]);
  }

  handleSortByValueChange(sortByValue: string) {
    this.selectedSortByOption = sortByValue;
    this.sortBookList();
  }

  sortBookList() {
    this._commonService.sortBookList(this.selectedSortByOption);
  }

  bookTrackBy(index: number, book: Book) {
    return book.id;
  }

  // Handle Delete & Modify Book actions
  handleBookActions(event: { actionType: string, bookId: string }) {
    if (event.actionType === APP_CONSTANTS.actions.delete) {
      this.handleDeleteBookAction(event.bookId);
    } else if (event.actionType === APP_CONSTANTS.actions.modify) {
      this.handleModifyBookAction(event);
    }
  }

  handleDeleteBookAction(bookId: string){
    this._commonService.deleteBook(bookId);
  }

  handleModifyBookAction(event: { actionType: string, bookId: string }) {
    this._commonService.openBookDialog({ actionType: event.actionType, book: this.getBook(event.bookId) }).subscribe((result: Book) => {
      result ? this._commonService.modifyBook(result) : null;
      // Apply Sorting if it was present
      if (this.selectedSortByOption) {
        this.sortBookList();
      }
    });
  }

  getBook(bookId: string) {
    return this.bookList.find(b => b.id === bookId);
  }

  ngOnDestroy(): void {
    // Unsubscribe the created Subscriptions to avoid memory leaks
    unsubscribe([this.getAuthorSubs, this.getBookListSubs]);
  }
}
