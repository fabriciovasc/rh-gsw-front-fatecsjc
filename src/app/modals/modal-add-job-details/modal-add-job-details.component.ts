import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {JobDetailsName} from '../../api/model/job-details';
import {ToastrService} from 'ngx-toastr';

@Component({
  templateUrl: 'modal-add-job-details.component.html',
  styleUrls: ['modal-add-job-details.component.scss']
})
export class ModalAddJobDetailsComponent implements OnInit {

  jobDetail: string;
  storedDetails: Array<string>;

  form: FormGroup;
  detail: AbstractControl;

  details: Array<string> = new Array<string>();

  JobDetailsName = JobDetailsName;

  callbacks: { success?: () => void, error?: (err) => void };

  constructor(public bsModalRef: BsModalRef,
              public formBuilder: FormBuilder,
              public toastrService: ToastrService) {

  }

  ngOnInit() {
    this.storedDetails = JSON.parse(localStorage.getItem(`storedDetails.${this.jobDetail}`));

    if (this.storedDetails) {
      this.details = this.storedDetails;
    }

    this.form = this.formBuilder.group({
      detail: ['', Validators.minLength(2)]
    });

    this.detail = this.form.get('detail');

  }

  addDetail() {
    if (this.form.valid) {
      this.details.push(this.detail.value);
      this.detail.setValue('');
    }
  }

  saveDetails() {
    if (this.form.valid) {
      localStorage.setItem(`storedDetails.${this.jobDetail}`, JSON.stringify(this.details));
      if (this.callbacks && this.callbacks.success) {
        this.callbacks.success();
      }
      this.bsModalRef.hide();
    } else {
      console.log('aa')
      this.toastrService.warning('O detalhe deve ter no mínimo dois caracteres');
    }
  }
}
