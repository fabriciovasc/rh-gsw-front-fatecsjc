import {Component, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ModalAddJobDetailsComponent} from '../../modals/modal-add-job-details/modal-add-job-details.component';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WEEK_DAYS_SHORT} from '../../api/util/constants';
import {defaultSortFunction} from '../../api/util/util';
import {Status} from '../../api/model/status';
import {JobService} from '../../api/service/job.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Job} from '../../api/model/job';

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
  startTime: AbstractControl;
  endTime: AbstractControl;
  startDay: AbstractControl;
  endDay: AbstractControl;

  defaultSortFunction = defaultSortFunction;

  weekDays = {
    SUNDAY: {day: WEEK_DAYS_SHORT.SUNDAY, checked: false},
    MONDAY: {day: WEEK_DAYS_SHORT.MONDAY, checked: false},
    TUESDAY: {day: WEEK_DAYS_SHORT.TUESDAY, checked: false},
    WEDNESDAY: {day: WEEK_DAYS_SHORT.WEDNESDAY, checked: false},
    THURSDAY: {day: WEEK_DAYS_SHORT.THURSDAY, checked: false},
    FRIDAY: {day: WEEK_DAYS_SHORT.FRIDAY, checked: false},
    SATURDAY: {day: WEEK_DAYS_SHORT.SATURDAY, checked: false},
  };
  selectedWeekDays = [];
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
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      startDay: ['', Validators.required],
      endDay: ['', Validators.required]
    });

    this.selectedArea = this.form.get('selectedArea');
    this.selectedVaga = this.form.get('selectedVaga');
    this.selectedLocal = this.form.get('selectedLocal');
    this.startTime = this.form.get('startTime');
    this.endTime = this.form.get('endTime');
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
    this.modalService.show(ModalAddJobDetailsComponent, {initialState, class: 'modal-sm'});
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
        cargaHoraria: 16,
        inicioVaga: this.startDay.value,
        fimVaga: this.endDay.value
      };

      console.log(job)

      this.jobService.create(job).subscribe(data => {
        console.log(data);
      });
    }
  }

  selectDays(checked, day) {
    this.weekDays[day].checked = checked;
    this.weekDays = {...this.weekDays};

    const selectedDay = this.weekDays[day].day;
    const index = this.selectedWeekDays.indexOf(selectedDay);

    if (!checked) {
      this.selectedWeekDays.splice(index, 1);
    } else {
      this.selectedWeekDays.push(selectedDay);
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
