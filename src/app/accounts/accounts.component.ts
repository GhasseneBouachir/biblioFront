import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../models/Account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  x = false;
  accounts: Account [] = [];
  addForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    mail: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  });

  submitted = false;
  constructor(private accountService: AccountService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.accounts = this.accountService.getAccounts();
  }
  
  show()
  {
    this.x = true;
  }

  addAccount(): void {
    this.x = false;
    const account = new Account (this.addForm.value.username, this.addForm.value.mail, this.addForm.value.password,
       this.addForm.value.firstName,this.addForm.value.lastName);

    this.accountService.create(account)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  OnDelete(n: Account)
  {
    this.accountService.delete(n.accountId);
  }
  OnUpdate(n: Account){
   this.accountService.update(n.accountId,n);
  }

}
