import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CrowdfundingService} from "../services/crowdfunding.service";

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private crowdfundingService: CrowdfundingService, private router: Router) {}

  campaign: any;
  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString !== null) {
      const id = +idString; // Convert string to number
      this.campaign = this.crowdfundingService.getCampaignDetails(id);
    }
  }

  goBack(): void {
    this.router.navigate(['/campaigns']);
  }
}
