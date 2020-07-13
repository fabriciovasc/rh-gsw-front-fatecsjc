export class Job {
  id?: number;
  area?: string;
  vaga?: string;
  local?: string;
  beneficios?: string;
  competencias?: string;
  cargaHoraria?: number;
  inicioVaga?: string;
  fimVaga?: string;
  inscritos?: string;
  selecionados?: string;
  aprovados?: string;

  constructor(job) {
    if (typeof job === 'number') {
      this.id = job;
    } else if (job) {
      this.id = job.id || '';
      this.area = job.area || '';
      this.vaga = job.vaga || '';
      this.local = job.local || '';
      this.beneficios = job.beneficios || '';
      this.competencias = job.competencias || '';
      this.cargaHoraria = job.cargaHoraria || '';
      this.inicioVaga = job.inicioVaga || '';
      this.fimVaga = job.fimVaga || '';
      this.inscritos = job.inscritos || '';
      this.selecionados = job.selecionados || '';
      this.aprovados = job.aprovados || '';
    }
  }
}
