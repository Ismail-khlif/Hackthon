import { Component, OnInit } from '@angular/core';
import {CrowdfundingService} from "../services/crowdfunding.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private crowdfundingservice: CrowdfundingService, private router: Router) { }

  ngOnInit(): void {
  }

  // onSubmit(): void {
  //   this.crowdfundingservice.createAccount().subscribe(response => {
  //     // Store the response data in localStorage
  //     localStorage.setItem('response_data', JSON.stringify(response));
  //   });
  //
  storeResponseInLocalStorage(): void {

  }



  //   // Redirect to '/vd'
  //   this.router.navigate(['/campaigns']);
  // }
  onSubmit(): void {
    this.crowdfundingservice.createAccount().subscribe(response => {
      // Convert response to JSON string
      const jsonStr = JSON.stringify(response);

      // Create a Blob object from the JSON string
      const blob = new Blob([jsonStr], { type: 'application/json' });

      // Create a URL for the Blob object
      const url = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement('a');

      // Set the href attribute of the link to the URL
      link.href = url;

      // Set the download attribute of the link to specify the filename
      link.download = 'response_data.json';

      // Append the link to the document body
      document.body.appendChild(link);

      // Click the link to trigger the download
      link.click();

      // Clean up by revoking the URL
      window.URL.revokeObjectURL(url);

      // Redirect to '/campaigns'
      this.router.navigate(['/campaigns']);
    });
  }
}
