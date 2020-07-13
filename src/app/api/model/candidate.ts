export class Candidate {
  id?: number;
  nome?: string;
  cpf?: string;
  rua?: string;
  bairro?: string;
  numero?: number;
  cidade?: string;
  email?: string;
  competencias?: string;
  experiencias?: string;
  objetivo?: string;
  formacao?: string;
  comentarios?: string;

  constructor(candidate) {
    if (typeof candidate === 'number') {
      this.id = candidate;
    } else if (candidate) {
      this.id = candidate.id || '';
      this.nome = candidate.nome || '';
      this.cpf = candidate.cpf || '';
      this.rua = candidate.rua || '';
      this.bairro = candidate.bairro || '';
      this.numero = candidate.numero || '';
      this.cidade = candidate.cidade || '';
      this.email = candidate.email || '';
      this.competencias = candidate.competencias || '';
      this.objetivo = candidate.objetivo || '';
      this.formacao = candidate.formacao || '';
      this.comentarios = candidate.comentarios || '';
    }
  }
}
