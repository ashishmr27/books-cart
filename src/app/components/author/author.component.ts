import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Author } from 'src/app/shared/models/author.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent {

  @Input() name!: string;
  @Input() birthday!: string;
  @Input() birthPlace!: string;

}
