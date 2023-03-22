import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { APP_CONSTANTS } from 'src/app/shared/constants/contants';
import { Book } from 'src/app/shared/models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent {

  @Input() book!: Book;
  @Output() bookAction = new EventEmitter<{ actionType: string, bookId: string }>();

  modifyAction = APP_CONSTANTS.actions.modify;
  deleteAction = APP_CONSTANTS.actions.delete;

  handleActionClick(actionType: string, bookId: string) {
    this.bookAction.emit({ actionType, bookId });
  }
}
