export class Job {
  id: string;
  area: string;
  objetivo: string;
  requerido: string;
  experiencia: number;

  constructor(job) {
    if (typeof job === 'string') {
      this.id = job;
    } else if (job) {
      this.id = job.id || '';
      this.area = job.area || '';
      this.objetivo = job.objetivo || '';
      this.requerido = job.requerido || '';
      this.experiencia = job.experiencia || '';
    }
  }
}
