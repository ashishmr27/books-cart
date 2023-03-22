import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css']
})
export class FormBookComponent implements OnInit {

  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    PublishDate: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    purchaseLink: new FormControl('', [Validators.required])
  });

  bookFormArray: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<FormBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.bookForm.patchValue({...this.data.book});
    console.log(Object.keys(this.bookForm.controls));
    this.bookFormArray = Object.keys(this.bookForm.controls); 
  }

  getErrorMessage() {
    return 'You must enter a value';
  }

  onSubmit(){
    const book = {...this.bookForm.value, id: this.data.book.id};
    this.dialogRef.close(book);
  }
}
