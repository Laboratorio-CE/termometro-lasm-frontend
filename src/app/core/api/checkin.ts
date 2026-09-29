import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { CheckinForm } from '../models/checkin';

@Service()
export class Checkin {
    private readonly http = inject(HttpClient);

    registrar(form: CheckinForm) {
        return this.http.post<void>('/api/checkins', form);
    }
}
