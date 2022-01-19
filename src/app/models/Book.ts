export class Book {

    id: String;
    title : String;
    total_examplaries : number;
    author: String;

  constructor( title: String, total_examplaries: number, author: String) {
    this.title = title;
    this.total_examplaries = total_examplaries;
    this.author = author;
  }


  }
