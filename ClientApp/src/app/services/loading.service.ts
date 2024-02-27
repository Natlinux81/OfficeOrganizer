import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading = new BehaviorSubject(false);
  public loadingStatus: boolean = false;

  constructor() {
    this.isLoading.subscribe((status: boolean) =>
      this.loadingStatus = status);
  }
}
