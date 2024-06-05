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
  public visaList: FullVisa[] = [];
  public visas: string[] = [];
  public visaDescriptions: string[] = [];
  public working: boolean;
  public workingVal: number;
  public query: string = '';
  public payload: QueryPayload;
  public hasResponse: boolean;
  constructor(private http: HttpClient) {
    this.payload = { language: '', country: '', query: '' };
    this.hasResponse = false;
    this.working = false;
    this.workingVal = 0;
  }

  ngOnInit() {

    this.Countries = countries;
    this.Languages = languages;
    this.queryResponse = "The answer is...";
    // flag to show progress bar or not
    this.working = false;
    this.selectedLanguage = 'English';

    // this is used for the progress bar
    setInterval(() => {
      if (this.workingVal > 99) { this.workingVal = 0 } else { this.workingVal = this.workingVal + 10; }
    }, 200);
  }

  onGoBack() {
    this.hasResponse = false;

  }

  onChangeLanguage(language:string) {
    this.selectedLanguage = language;

  }
  onSubmit() {
    this.working = true;
    this.selectedCountry = 'European';

    this.payload = { language: this.selectedLanguage, country: this.selectedCountry, query: this.query };
    //https://localhost:44381
    //https://airiesample555.azurewebsites.net/
    this.http.post<RetVal>('https://airiesample555.azurewebsites.net/chatAI', this.payload).subscribe(data => {
      console.log(data);
      this.working = false;
      this.hasResponse = true;
      this.queryResponse = data.fullResponse.toString();
      this.visas = data.visas;
      this.visaDescriptions = data.visaDescriptions;
      this.visaList = [];
      for (let i = 0; i < data.visas.length; i++) {
        var fullVisa = { 'visa': data.visas[i], 'visaDescription': data.visaDescriptions[i] };
        this.visaList.push(fullVisa);
      }
    })


  }

  

  title = 'airie.client';
}

// interfaces
interface RetVal {
  number: number;
  fullResponse: string;
  visas: string[];
  visaDescriptions: string[];
}
interface QueryPayload {
  language: string;
  country: string;
  query: string;
}
interface FullVisa {
  visa: string;
  visaDescription: string;
}
