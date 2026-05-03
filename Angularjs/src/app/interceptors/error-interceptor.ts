import { HttpInterceptorFn } from '@angular/common/http';
import { inject }            from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService }   from '../services/notification';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  return next(req).pipe(
    catchError(error => {
      let message = 'Something went wrong. Please try again.';
      if (error.status === 0)   message = 'No internet connection.';
      if (error.status === 404) message = 'Resource not found.';
      if (error.status === 500) message = 'Server error. Try again later.';
      notificationService.error(message);
      return throwError(() => error);
    })
  );
};