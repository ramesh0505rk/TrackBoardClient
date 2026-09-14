import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth } from "./auth";
export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const authService = inject(Auth);

    let isAuthenticated = authService.isAuthenticatedSubject.getValue();

    if (!isAuthenticated) {
        router.navigate(['/signin']);
        return false;
    }

    return true;
}