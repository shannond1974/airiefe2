import { HttpClient } from '@angular/common/http';
import { Component, OnInit , Output,EventEmitter} from '@angular/core';
import countries from '../countries.json';
import languages from '../languages.json';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  //@Output() onClickSubmit = new EventEmitter<string>();
  public Countries: any[] = [];
  public Languages: any[] = [];
  public selectedCountry: string='';
  public selectedLanguage: string = '';
  public queryResponse: string = '';
  public query: string = '';
  public payload: QueryPayload;

  constructor(private http: HttpClient) {
    this.payload = { language: '', country: '', query: '' };
  }

  ngOnInit() {

    this.Countries = countries;
    this.Languages = languages;
    this.queryResponse = "The answer is...";
   
  }

  onSubmit() {
    this.payload = { language: this.selectedLanguage, country: this.selectedCountry, query: this.query };

    this.http.post<RetVal>('https://airiesample555.azurewebsites.net/chatAI', this.payload).subscribe(data => {
      console.log(data);
      
      this.queryResponse = data.response.toString();
     
    })
     
   
  }

  

  title = 'airie.client';
}
interface RetVal {
  response: string;
}
interface QueryPayload {
  language: string;
  country: string;
  query: string;
}
