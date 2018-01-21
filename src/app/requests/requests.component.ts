import { Component, OnInit } from '@angular/core';
import { RequestService } from '../services/request.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: Array<any> = [];
  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.requestService.getAll()
    .subscribe((data: Array<any>) => {
      this.requests = data;
    });
  }

}
