import { Component, OnInit } from '@angular/core';
import {CrowdfundingService} from "../services/crowdfunding.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {
  id: number =0;
  title: string = '';
  description: string = '';
  target: number = 0;
  deadline: string = '';
  image: string = '';

  constructor(private crowdfundingService: CrowdfundingService, private router: Router) {}

  ngOnInit(): void {
  }
  onSubmit(): void {
    const deadlineDate = new Date(this.deadline);
    this.crowdfundingService.createCampaign(
      'Owner', // Provide the owner dynamically or through user authentication
      this.title,
      this.description,
      this.target,
      deadlineDate,
      this.image
    );
    this.router.navigate(['/campaigns']); // Navigate back to the campaign list
  }

}
