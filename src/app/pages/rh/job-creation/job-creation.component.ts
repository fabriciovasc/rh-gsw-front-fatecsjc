import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ModalAddCreateJobDetailsComponent} from '../../../modals/modal-add-create-job-details/modal-add-create-job-details.component';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WEEK_DAYS_SHORT} from '../../../api/util/constants';
import {defaultSortFunction} from '../../../api/util/util';
import {Status} from '../../../api/model/status';
import {JobService} from '../../../api/service/job.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Job} from '../../../api/model/job';

@Component({
  selector: 'app-job-creation',
  templateUrl: 'job-creation.component.html',
  styleUrls: ['job-creation.component.scss']
})
export class JobCreationComponent implements OnInit {

  storedDetails: any = {};

  form: FormGroup;
  selectedArea: AbstractControl;
  selectedVaga: AbstractControl;
  selectedLocal: AbstractControl;
  cargaHoraria: AbstractControl;
  startDay: AbstractControl;
  endDay: AbstractControl;

  defaultSortFunction = defaultSortFunction;

  beneficiosKey: any = {};
  selectedBeneficios = [];
  competenciasKey: any = {};
  selectedCompetencias = [];

  loadStatus: Status = new Status();

  constructor(private modalService: BsModalService,
              private formBuilder: FormBuilder,
              public toastrService: ToastrService,
              public router: Router,
              private jobService: JobService) {

  }

  ngOnInit() {
    this.getDetailsAndTransformToKey();
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      selectedArea: ['', Validators.required],
      selectedVaga: ['', Validators.required],
      selectedLocal: ['', Validators.required],
      startDay: ['', Validators.required],
      endDay: ['', Validators.required],
      cargaHoraria: [0, Validators.required]
    });

    this.selectedArea = this.form.get('selectedArea');
    this.selectedVaga = this.form.get('selectedVaga');
    this.selectedLocal = this.form.get('selectedLocal');
    this.cargaHoraria = this.form.get('cargaHoraria');
    this.startDay = this.form.get('startDay');
    this.endDay = this.form.get('endDay');
  }

  getDetailsAndTransformToKey() {
    this.storedDetails = {
      areas: JSON.parse(localStorage.getItem('storedDetails.areas')),
      beneficios: JSON.parse(localStorage.getItem('storedDetails.beneficios')),
      competencias: JSON.parse(localStorage.getItem('storedDetails.competencias')),
      locais: JSON.parse(localStorage.getItem('storedDetails.locais')),
      vagas: JSON.parse(localStorage.getItem('storedDetails.vagas'))
    };

    Object.keys(this.storedDetails.beneficios).forEach((key) => {
      this.beneficiosKey[key] = {label: this.storedDetails.beneficios[key], checked: false};
    });

    Object.keys(this.storedDetails.competencias).forEach((key) => {
      this.competenciasKey[key] = {label: this.storedDetails.competencias[key], checked: false};
    });
  }

  addDetails(jobDetail) {
    const initialState = {
      jobDetail,
      callbacks: {
        success: () => {
          this.getDetailsAndTransformToKey();
        }
      }
    };
    this.modalService.show(ModalAddCreateJobDetailsComponent, {initialState, class: 'modal-sm', ignoreBackdropClick: true});
  }

  create() {
    if (this.form.valid) {
      this.loadStatus.setAsProcessing();

      const job: Job = {
        area: this.selectedArea.value,
        vaga: this.selectedVaga.value,
        local: this.selectedLocal.value,
        beneficios: JSON.stringify(this.selectedBeneficios),
        competencias: JSON.stringify(this.selectedCompetencias),
        cargaHoraria: this.cargaHoraria.value,
        inicioVaga: this.startDay.value,
        fimVaga: this.endDay.value
      };

      this.jobService.create(job).subscribe(data => {
        this.loadStatus.setAsSuccess();
        this.toastrService.success('Vaga criada com sucesso!', 'Sucesso');
        this.router.navigate(['rh', 'registered-jobs']);
      }, error => {
        console.log(error)
      });
    }
  }

  selectBeneficios(checked, beneficio) {
    this.beneficiosKey[beneficio].checked = checked;
    this.beneficiosKey = {...this.beneficiosKey};

    const selectedBeneficio = this.beneficiosKey[beneficio].label;
    const index = this.selectedBeneficios.indexOf(selectedBeneficio);

    if (!checked) {
      this.selectedBeneficios.splice(index, 1);
    } else {
      this.selectedBeneficios.push(selectedBeneficio);
    }
  }

  selectCompetencias(checked, competencia) {
    this.competenciasKey[competencia].checked = checked;
    this.competenciasKey = {...this.competenciasKey};

    const selectedCompetencia = this.competenciasKey[competencia].label;
    const index = this.selectedCompetencias.indexOf(selectedCompetencia);

    if (!checked) {
      this.selectedCompetencias.splice(index, 1);
    } else {
      this.selectedCompetencias.push(selectedCompetencia);
    }
  }
}
