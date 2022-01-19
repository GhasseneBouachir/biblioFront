import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../models/Student';
import { StudentsService } from '../services/students.service';
import {Book} from "../models/Book";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  formType : string;
  x : boolean = false;
  students: Student [] = [];
  public  msgBtn: string = "Add Student";
  public student : Student;

  addForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    cin: ['', Validators.required],
    phone: ['', Validators.required]
  });

  submitted = false;
  constructor(private studentsService: StudentsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.students = this.studentsService.getStudents();
  }

  getStudents() : void{
    this.students = this.studentsService.getStudents();
  }


  addStudent(): void {
    this.x = false;
      if(this.formType == "add") {
        let std: Student = new Student(this.addForm.value.firstName, this.addForm.value.lastName, this.addForm.value.cin,
          this.addForm.value.phone);

        this.studentsService.create(std)
          .subscribe(
            response => {
              this.submitted = true;
              this.getStudents();
              this.msgBtn = "Add Book";
            },
            error => {
              console.log(error);
            });
    }else{
        this.student.firstName = this.addForm.value.firstName;
        this.student.lastName = this.addForm.value.lastName;
        this.student.cin = this.addForm.value.cin;
        this.student.phone = this.addForm.value.phone;
        this.studentsService.update(this.student).subscribe(
          response =>{
            this.submitted = true;
            this.msgBtn = "Add Book";
            this.getStudents();
          },
          error =>{
            console.log(error);
          }
        );
    }
  }

  OnCreate() : void{

    this.addForm.controls['firstName'].setValue("");
    this.addForm.controls['lastName'].setValue("");
    this.addForm.controls['cin'].setValue("");
    this.addForm.controls['phone'].setValue("");

    this.formType = "add";
    this.x = !this.x;
    if (this.x)
      this.msgBtn = "Cancel";
    else
      this.msgBtn = "Add Book";
  }

  OnUpdate(n: Student): void{
    this.x = true;
    this.student = n;
    this.addForm.controls['firstName'].setValue(this.student.firstName);
    this.addForm.controls['lastName'].setValue(this.student.lastName);
    this.addForm.controls['cin'].setValue(this.student.cin);
    this.addForm.controls['phone'].setValue(this.student.phone);
    this.formType = "update";
    if (this.x)
      this.msgBtn = "Cancel";
  }

  OnDelete(n: Student)
  {
    this.studentsService.delete(n.id).subscribe(response => {
      this.getStudents();
    },error =>{
      console.log(error);
    });
  }

}
