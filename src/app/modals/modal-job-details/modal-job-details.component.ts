import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Job} from '../../api/model/job';
import {exportStringToArray} from '../../api/util/util';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {JobService} from '../../api/service/job.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  templateUrl: 'modal-job-details.component.html',
  styleUrls: ['modal-job-details.component.scss']
})
export class ModalJobDetailsComponent implements OnInit {

  job: Job;

  inscritos = [];
  selecionados = [];
  aprovados = [];

  exportToArray = exportStringToArray;

  constructor(public bsModalRef: BsModalRef,
              public jobService: JobService,
              public toastrService: ToastrService) {

  }

  ngOnInit() {
    this.inscritos = this.job.inscritos ? this.exportToArray(this.job.inscritos) : [];
    this.selecionados = this.job.selecionados ? this.exportToArray(this.job.selecionados) : [];
    this.aprovados = this.job.aprovados ? this.exportToArray(this.job.aprovados) : [];
  }

  save() {
    this.job.inscritos = this.inscritos.length ? JSON.stringify(this.inscritos) : null;
    this.job.selecionados = this.selecionados.length ? JSON.stringify(this.selecionados) : null;
    this.job.aprovados = this.aprovados.length ? JSON.stringify(this.aprovados) : null;

    console.log(this.job)

    this.jobService.update(this.job.id, this.job).subscribe(data => {
      this.toastrService.success('Gerenciamento de vaga salvo com sucesso!', 'Sucesso');
      this.bsModalRef.hide();
    });
  }

  drop(event: CdkDragDrop<[any]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
