import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrowdfundingService {

  private campaigns: any[] = [];

  constructor(private httpClient: HttpClient) { }

  createCampaign(owner: string, title: string, description: string, target: number, deadline: Date, image: string): number {
    const campaign = {
      owner,
      title,
      description,
      target,
      deadline,
      amountCollected: 0,
      image,
      donators: [],
      donations: []
    };

    this.campaigns.push(campaign);

    return this.campaigns.length - 1; // Return the index of the newly added campaign
  }

  getCampaignDetails(id: number): any {
    return this.campaigns[id];
  }

  getAllCampaigns(): any[] {
    return this.campaigns;
  }
  readonly invest = 'http://localhost:3000/users/transfer-funds'
  readonly  transfer_NFT = 'http://localhost:3000/NFTs/transfer-NFT'
  readonly create_NFT = 'http://localhost:3000/NFTs/create-NFT'

  readonly create_account = 'http://localhost:3000/users/create-account'
  createAccount(): Observable<any> {
    // debugger
    return this.httpClient.get(this.create_account);
  }

  createNFT(): Observable<any> {
    // debugger
    return this.httpClient.get(this.create_NFT);
  }

  transferNFT(tokenId: string, senderId: string, privateKey: string): Observable<any> {
    const params = new HttpParams()
      .set('TokenId', tokenId)
      .set('secondAccountId', senderId)
      .set('secondPrivateKey', privateKey)

    // debugger
    return this.httpClient.get(this.transfer_NFT, { params });
  }

  investt(senderId: string, privateKey: string, investmentType: string, amount: number): Observable<any> {
    const params = new HttpParams()
      .set('senderId', senderId)
      .set('senderPrivateKey', privateKey)
      .set('receiverId', investmentType)
      .set('amount', amount.toString());

    return this.httpClient.get(this.invest, { params });
  }





}
