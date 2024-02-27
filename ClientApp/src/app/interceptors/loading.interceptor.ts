import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { TaskService } from '../services/task.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private requests : HttpRequest<any> [] = [];

  constructor(private loadingService: LoadingService, private taskService: TaskService) {}

  public removeRequests(req: HttpRequest<any>) {
    const INDEX = this.requests.indexOf(req);
    
    if (INDEX >= 0) {
      this.requests.splice(INDEX, 1);
    }
    this.loadingService.isLoading.next(this.requests.length > 0);
  }

  public intercept(request: HttpRequest<any>, 
  next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    console.log(this.requests);

    console.log('Request detected',request.url);
    this.requests.push(request);
    console.log(this.requests);

    this.loadingService.isLoading.next(true);

    return new Observable(observer => {
      const SUBSCRIPTION = next.handle(request).subscribe( event => {
        if (event instanceof HttpResponse) {
          this.removeRequests(request);
          observer.next(event);
          console.log('remove Request',request.url)
        }
      })
    });
  }
}



