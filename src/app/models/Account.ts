export class Account {
   accountId: Number;
    username : String;
    mail : String;
    password : String;
    firstName: String;
    lastName: String;
    constructor(username : String, mail : String, password : String, firstName: String, lastName: String)
    {
      this.firstName=firstName;
      this.lastName=lastName;
      this.mail=mail;
      this.password= password;
      this.username=username
    }
  }