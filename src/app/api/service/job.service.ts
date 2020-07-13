import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Job} from '../model/job';
import {map} from 'rxjs/operators';

@Injectable()
export class JobService {

  private endPoint;

  constructor(private http: HttpClient) {
    this.http = http;
    this.endPoint = `${environment.backendUrl}`;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  get(): Observable<Array<Job>> {
    return this.http.get(this.endPoint + '/vagas').pipe(
      map((jobs: any) => jobs.map(job => new Job(job)))
    );
  }

  getById(jobId): Observable<Job> {
    return this.http.get(this.endPoint + '/vagas/' + jobId) as Observable<Job>;
  }

  create(job: Job): Observable<Job> {
    return this.http.post<Job>(this.endPoint + '/vagas', job, this.httpOptions);
  }

  update(jobId: number, job: any) {
    return this.http.put(this.endPoint + '/vagas/' + jobId, job, this.httpOptions);
  }

  updateCandidates(jobId: number, candidatos: Array<string>) {
    return this.http.put(this.endPoint + '/vagas/' + jobId, candidatos, this.httpOptions);
  }

  delete(jobId: number) {
    return this.http.delete(this.endPoint + '/vagas/' + jobId);
  }
}
