import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BooksService } from '../services/books.service';
import { Book } from '../models/Book';
import {HttpErrorResponse} from '@angular/common/http';
import {error} from "@angular/compiler/src/util";


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  public  x: Boolean = false;
  public  msgBtn: string = "Add Book";
  public formType : string;
  books: Book [] = [];
  public book : Book;

  addForm: FormGroup = this.fb.group({
    bookName: ['', Validators.required],
    bookAuthor: ['', Validators.required],
    total_examplaries: ['', Validators.required]
  });

  submitted = false;
  updateFrom: Boolean = false;
  constructor(private booksService: BooksService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getBooks();
  }



  showUpdateForm() : void
  {
    this.x = !this.x;
    if (this.x)
      this.msgBtn = "Cancel";
    else
      this.msgBtn = "Add Book";
  }


  submit(): void {
    this.x = false;
    if(this.formType == "add"){
      let bookForCreation : Book = new Book(this.addForm.value.bookName, this.addForm.value.total_examplaries, this.addForm.value.bookAuthor);
      this.booksService.create(bookForCreation)
        .subscribe(
          response => {
            this.submitted = true;
            this.msgBtn = "Add Book";
            this.getBooks();
          },
          error => {
            console.log(error);
          });
    }
    else{
      this.book.title = this.addForm.value.bookName;
      this.book.author = this.addForm.value.bookAuthor;
      this.book.total_examplaries = this.addForm.value.total_examplaries;
        this.booksService.update(this.book).subscribe(
                response =>{
                  this.submitted = true;
                  this.msgBtn = "Add Book";
                  this.getBooks();
                },
          error =>{
                  console.log(error);
          }
        );
    }
  }
  OnCreate() : void{

  this.addForm.controls['bookName'].setValue("");
  this.addForm.controls['bookAuthor'].setValue("");
  this.addForm.controls['total_examplaries'].setValue("");

  this.formType = "add";
   this.x = !this.x;
     if (this.x)
      this.msgBtn = "Cancel";
    else
      this.msgBtn = "Add Book";
  }

  OnUpdate(n: Book): void{
    this.x = true;
    this.book = n;
    this.addForm.controls['bookName'].setValue(this.book.title);
    this.addForm.controls['bookAuthor'].setValue(this.book.author);
    this.addForm.controls['total_examplaries'].setValue(this.book.total_examplaries);
    this.formType = "update";
    if (this.x)
      this.msgBtn = "Cancel";
  }

  OnDelete(n: Book): void
  {
    this.booksService.delete(n.id).subscribe(response => {
      this.getBooks();
      },error =>{
      console.log(error);
    });

  }


  public getBooks(): void{
    this.books = [];
    this.booksService.getBooks().subscribe((response) => {
      response.map((res: Book ) => {
          this.books.push(res);
      });
      },
         (error: HttpErrorResponse) => {
            alert(error.message);
    } );
  }
}
