import { Component, OnInit } from '@angular/core';
import {CrowdfundingService} from "../services/crowdfunding.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-invest-campaign',
  templateUrl: './invest-campaign.component.html',
  styleUrls: ['./invest-campaign.component.css']
})
export class InvestCampaignComponent implements OnInit {

  senderId!: string;
  privatekey!: string;
  amount!: number;
  constructor(private crowdfundingService: CrowdfundingService, private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.crowdfundingService.investt(this.senderId,this.privatekey,'0',this.amount).subscribe(response => {
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
      link.download = 'invest_data.json';

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
