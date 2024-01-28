import { Component, OnInit } from '@angular/core';
import {CrowdfundingService} from "../services/crowdfunding.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transfer-nft',
  templateUrl: './transfer-nft.component.html',
  styleUrls: ['./transfer-nft.component.css']
})
export class TransferNftComponent implements OnInit {

  constructor(private crowdfundingService: CrowdfundingService, private router: Router) {}

  tokenId!: string;
  senderId!: string;
  privatekey!: string;
  ngOnInit(): void {
  }

  onSubmit(): void {
    this.crowdfundingService.transferNFT(this.tokenId,this.senderId,this.privatekey).subscribe(response => {
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
      link.download = 'Transfer_NFT.json';

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
