import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ToastrService} from 'ngx-toastr';
import {Job} from '../../api/model/job';
import {Status} from '../../api/model/status';
import {CandidateService} from '../../api/service/candidate.service';
import {JobService} from '../../api/service/job.service';
import {not} from 'rxjs/internal-compatibility';
import {timeout} from 'rxjs/operators';
import {Candidate} from '../../api/model/candidate';

@Component({
  templateUrl: 'modal-job-candidate.component.html',
  styleUrls: ['modal-job-candidate.component.scss']
})
export class ModalJobCandidateComponent implements OnInit {

  selectedJob: Job;

  searchCandidateForm: FormGroup;
  searchCpf: AbstractControl;

  registerForm: FormGroup;
  nome: AbstractControl;
  cpf: AbstractControl;
  rua: AbstractControl;
  bairro: AbstractControl;
  numero: AbstractControl;
  cidade: AbstractControl;
  email: AbstractControl;
  competencias: AbstractControl;
  objetivo: AbstractControl;
  formacao: AbstractControl;

  firstStep = true;
  secondStep = false;

  loadStatus: Status = new Status();

  // callbacks: { success?: () => void, error?: (err) => void };

  constructor(public bsModalRef: BsModalRef,
              public formBuilder: FormBuilder,
              public candidateService: CandidateService,
              public jobService: JobService,
              public toastrService: ToastrService) {
  }

  ngOnInit() {
    this.initializeSearchCandidateForm();
  }

  initializeSearchCandidateForm() {
    this.searchCandidateForm = this.formBuilder.group({
      searchCpf: ['']
    });
    this.searchCpf = this.searchCandidateForm.get('searchCpf');
  }

  initializeRegisterCandidateForm() {
    this.registerForm = this.formBuilder.group({
      nome: [''],
      cpf: [''],
      rua: [''],
      bairro: [''],
      numero: [''],
      cidade: [''],
      email: [''],
      competencias: [''],
      objetivo: [''],
      formacao: ['']
    });

    this.nome = this.registerForm.get('nome');
    this.cpf = this.registerForm.get('cpf');
    this.rua = this.registerForm.get('rua');
    this.bairro = this.registerForm.get('bairro');
    this.numero = this.registerForm.get('numero');
    this.cidade = this.registerForm.get('cidade');
    this.email = this.registerForm.get('email');
    this.competencias = this.registerForm.get('competencias');
    this.objetivo = this.registerForm.get('objetivo');
    this.formacao = this.registerForm.get('formacao');

    if (this.searchCpf.value) {
      this.cpf.setValue(this.searchCpf.value);
    }
  }

  getCandidate() {
    if (this.searchCandidateForm.valid) {
      this.loadStatus.setAsProcessing();
      this.candidateService.getByCpf(this.searchCpf.value).pipe(timeout(10000)).subscribe(candidate => {
        this.loadStatus.setAsValid();
        this.applyCandidate(candidate.cpf);
      }, error => {
        const notExist = error.error;
        if (notExist === 'Candidato does not exist') {
          this.loadStatus.setAsNotFound();
          this.firstStep = false;
          this.secondStep = true;
          this.initializeRegisterCandidateForm();
        } else {
          this.loadStatus.setAsError();
        }
      });
    }
  }

  applyCandidate(candidateCpf: string) {
    const candidatos = [candidateCpf];
    this.jobService.updateCandidates(this.selectedJob.id, candidatos).pipe(timeout(10000)).subscribe(data => {
      this.toastrService.success('Você foi inscrito na vaga com sucesso! Aguarde o contato da GSW.', 'Parabéns!');
      this.bsModalRef.hide();
    });
  }

  registerCandidate() {
    if (this.registerForm.valid) {
      this.loadStatus.setAsProcessing();
      const newCandidate: Candidate = {
        nome: this.nome.value,
        cpf: this.cpf.value,
        rua: this.rua.value,
        bairro: this.bairro.value,
        numero: this.numero.value,
        cidade: this.cidade.value,
        email: this.email.value,
        competencias: this.competencias.value,
        objetivo: this.objetivo.value,
        formacao: this.formacao.value
      };
      this.candidateService.create(newCandidate).pipe(timeout(10000)).subscribe(candidate => {
        this.applyCandidate(candidate.cpf);
        this.loadStatus.setAsSuccess();
      }, error => {
        console.log(error);
        this.loadStatus.setAsError();
      });
    }
  }
}
