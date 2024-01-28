import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CrowdfundingService} from "../services/crowdfunding.service";

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  campaigns: any[] = [];

  constructor(private crowdfundingService: CrowdfundingService, private router: Router) { }

  ngOnInit(): void {
    this.campaigns = this.crowdfundingService.getAllCampaigns();
  }

  handleCreateCampaign(): void {
    this.router.navigate(['/createcampaign']);
  }

  showCampaignDetails(id: number): void {
    this.router.navigate(['/campaigndetail', id]);
  }



}
