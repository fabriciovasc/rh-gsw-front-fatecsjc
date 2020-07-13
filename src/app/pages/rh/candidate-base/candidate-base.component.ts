import {Component, OnInit} from '@angular/core';
import {Status} from '../../../api/model/status';
import {JobService} from '../../../api/service/job.service';
import {timeout} from 'rxjs/operators';
import {Job} from '../../../api/model/job';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ModalJobDetailsComponent} from '../../../modals/modal-job-details/modal-job-details.component';
import {ParamsService} from '../../../api/service/params.service';
import {Router} from '@angular/router';
import {Candidate} from '../../../api/model/candidate';
import {CandidateService} from '../../../api/service/candidate.service';
import {ModalAddCandidateCommentsComponent} from '../../../modals/modal-add-candidate-comments/modal-add-candidate-comments.component';

@Component({
  selector: 'app-registered-jobs',
  templateUrl: 'candidate-base.component.html',
  styleUrls: ['candidate-base.component.scss']
})
export class CandidateBaseComponent implements OnInit {

  candidates: Candidate[] = [];

  loadStatus: Status = new Status();

  constructor(private candidateService: CandidateService,
              private modalService: BsModalService,
              private router: Router,
              private paramsService: ParamsService) {

  }

  ngOnInit() {
    this.getCandidates();
  }

  getCandidates() {
    this.loadStatus.setAsProcessing();
    this.candidateService.get().pipe(timeout(10000)).subscribe(jobs => {
      this.candidates = jobs;
      this.loadStatus.setAsSuccess();
    }, error => {
      this.loadStatus.setAsError();
      console.log(error);
    });
  }

  openJobDetail(job) {
    // const initialState = {
    //   job
    // };
    // this.modalService.show(ModalJobDetailsComponent, {initialState, class: 'modal-lg', ignoreBackdropClick: true});
  }

  addComments(candidate) {
    const initialState = {
      candidate
    };
    this.modalService.show(ModalAddCandidateCommentsComponent, {initialState, class: 'modal-sm', ignoreBackdropClick: true});
  }
}
