import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {Candidate} from '../../api/model/candidate';
import {CandidateService} from '../../api/service/candidate.service';

@Component({
  templateUrl: 'modal-add-candidate-comments.component.html',
  styleUrls: ['modal-add-candidate-comments.component.scss']
})
export class ModalAddCandidateCommentsComponent implements OnInit {

  candidate: Candidate;

  form: FormGroup;
  comments: AbstractControl;

  constructor(public bsModalRef: BsModalRef,
              public formBuilder: FormBuilder,
              public candidateService: CandidateService,
              public toastrService: ToastrService) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      comments: ['', Validators.minLength(2)]
    });

    this.comments = this.form.get('comments');

    if (this.candidate.comentarios) {
      this.comments.setValue(this.candidate.comentarios);
    }
  }

  save() {
    if (this.candidate) {
      this.candidate.comentarios = this.comments.value;
      this.candidateService.update(this.candidate.id, this.candidate).subscribe(data => {
        this.toastrService.success('Observações inseridas com sucesso!', 'Sucesso!');
        this.bsModalRef.hide();
      }, error => {
        console.log(error);
      });
    }
  }


}
