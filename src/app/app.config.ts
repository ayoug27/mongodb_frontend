import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {StudentRepository} from './repositories/student-repository';
import {MongoDbStudentRepository} from './data/mongo-db-student-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: StudentRepository, useClass: MongoDbStudentRepository},
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};
