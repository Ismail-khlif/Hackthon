import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestCampaignComponent } from './invest-campaign.component';

describe('InvestCampaignComponent', () => {
  let component: InvestCampaignComponent;
  let fixture: ComponentFixture<InvestCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestCampaignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
