import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const token = authService.getToken();
  alert(token)

  if (!token) return next(req);

  const authReq = req.clone({
    headers: req.headers.set(
      'Authorization', `Bearer ${token}`
    )
  });
 

  return next(authReq);
};