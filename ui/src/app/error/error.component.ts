import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  /**
   * Error code.
   */
  errorCode: number;
  /**
   * Error primary (brief) message.
   */
  errorPrimary: string;
  /**
   * Error secondary (detail) message.
   */
  errorSecondary: string;
  /**
   * Prev url to return to.
   */
  prevUrl: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const self = this;

    self.route.data.subscribe((data) => {
      self.errorCode = data.errorCode;
      self.errorPrimary = data.errorPrimary;
      self.errorSecondary = data.errorSecondary;
    });

    self.route.queryParams.subscribe((params) => {
      self.prevUrl = params.prevUrl;
    });
  }
}
