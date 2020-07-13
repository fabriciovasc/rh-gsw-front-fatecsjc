import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Job} from '../model/job';
import {map} from 'rxjs/operators';
import {Candidate} from '../model/candidate';

@Injectable()
export class CandidateService {

  private endPoint;

  constructor(private http: HttpClient) {
    this.http = http;
    this.endPoint = `${environment.backendUrl}`;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  get(): Observable<Array<Candidate>> {
    return this.http.get(this.endPoint + '/candidatos').pipe(
      map((candidates: any) => candidates.map(candidate => new Candidate(candidate)))
    );
  }

  getByCpf(candidateCPF: string): Observable<Candidate> {
    return this.http.get(this.endPoint + '/candidatos/' + candidateCPF) as Observable<Candidate>;
  }

  create(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.endPoint + '/candidatos', candidate, this.httpOptions);
  }

  update(candidateId: number, candidate: any) {
    return this.http.put(this.endPoint + '/candidatos/' + candidateId, candidate, this.httpOptions);
  }

  delete(candidateId: number) {
    return this.http.delete(this.endPoint + '/candidatos/' + candidateId);
  }
}
