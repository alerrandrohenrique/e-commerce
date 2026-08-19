import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from './Facades/auth.facade';
export const authGuard: CanActivateFn = () => {
const authFacade = inject(AuthFacade);
const router = inject(Router);
if (authFacade.estaLogado()) {
return true;
}
return router.createUrlTree(['/login']);
};