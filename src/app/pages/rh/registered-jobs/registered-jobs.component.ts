import {Component, OnInit} from '@angular/core';
import {Status} from '../../../api/model/status';
import {JobService} from '../../../api/service/job.service';
import {timeout} from 'rxjs/operators';
import {Job} from '../../../api/model/job';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ModalJobDetailsComponent} from '../../../modals/modal-job-details/modal-job-details.component';
import {ParamsService} from '../../../api/service/params.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-registered-jobs',
  templateUrl: 'registered-jobs.component.html',
  styleUrls: ['registered-jobs.component.scss']
})
export class RegisteredJobsComponent implements OnInit {

  jobs: Job[] = [];

  loadStatus: Status = new Status();

  constructor(private jobService: JobService,
              private modalService: BsModalService,
              private router: Router,
              private toastrService: ToastrService,
              private paramsService: ParamsService) {

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

  openJobDetail(job) {
    const initialState = {
      job
    };
    this.modalService.show(ModalJobDetailsComponent, {initialState, class: 'modal-lg', ignoreBackdropClick: true});
  }

  goToShareJob(jobId) {
    this.paramsService.add('jobId', jobId);
    this.router.navigate(['job', jobId]);
  }

  deleteJob(jobId) {
    this.loadStatus.setAsProcessing();
    this.jobService.delete(jobId).pipe(timeout(10000)).subscribe((job: Job) => {
      const index = this.jobs.findIndex(d => d.id === job.id);
      this.jobs.splice(index, 1);
      this.jobs = [].concat(this.jobs);
      this.toastrService.success('Vaga excluída com sucesso!');
      this.loadStatus.setAsSuccess();
    }, error => {
      this.loadStatus.setAsError();
      console.log(error);
    });
  }

}
