import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Status} from '../../api/model/status';
import {JobService} from '../../api/service/job.service';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-registered-jobs',
  templateUrl: 'registered-jobs.component.html',
  styleUrls: ['registered-jobs.component.scss']
})
export class RegisteredJobsComponent implements OnInit {

  jobs;

  loadStatus: Status = new Status();

  constructor(private modalService: BsModalService,
              private jobService: JobService) {

  }

  ngOnInit() {
    this.getJobs();
  }

  getJobs() {
    this.loadStatus.setAsProcessing();
    this.jobService.get().pipe(timeout(10000)).subscribe(jobs => {
      this.jobs = jobs;
      this.loadStatus.setAsSuccess();
    }, error => {
      this.loadStatus.setAsError();
      console.log(error);
    });
  }
}
