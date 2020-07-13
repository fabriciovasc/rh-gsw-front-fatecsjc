import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Status} from '../../api/model/status';
import {ParamsService} from '../../api/service/params.service';
import {JobService} from '../../api/service/job.service';
import {Job} from '../../api/model/job';
import {exportStringToArray} from '../../api/util/util';
import {ModalJobDetailsComponent} from '../../modals/modal-job-details/modal-job-details.component';
import {ModalJobCandidateComponent} from '../../modals/modal-job-candidate/modal-job-candidate.component';

@Component({
  selector: 'app-root',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  jobId: number;
  loadStatus: Status = new Status();
  job: Job;

  exportToArray = exportStringToArray;

  constructor(public modalService: BsModalService,
              public jobService: JobService,
              public paramsService: ParamsService) {
  }

  ngOnInit() {
    this.jobId = this.paramsService.get('jobId');
    if (this.jobId) {
      this.getJob();
    }
  }

  getJob() {
    this.loadStatus.setAsProcessing();
    this.jobService.getById(this.jobId).subscribe(job => {
      this.job = job;
      this.loadStatus.setAsSuccess();
    }, error => {
      console.log(error)
      this.loadStatus.setAsError();
    });
  }

  applyFor() {
    const initialState = {
      selectedJob: this.job,
      callbacks: {
        success: (res) => {
          console.log(res);
        }
      }
    };
    this.modalService.show(ModalJobCandidateComponent, {initialState, class: 'modal-lg', ignoreBackdropClick: true});
  }

}

