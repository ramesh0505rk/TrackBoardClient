import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Auth } from "./auth";

interface AuthGuardOptions {
    requireAuthorization?: boolean;

}
export function authGuard(options: AuthGuardOptions = {}): CanActivateFn {
    const { requireAuthorization = true } = options;

    return () => {
        const router = inject(Router);
        const authService = inject(Auth);

        let isAuthenticated = authService.isAuthenticatedSubject.getValue();

        if (!isAuthenticated) {
            router.navigate(['/signin']);
            return false;
        }

        if (requireAuthorization) {
            let isAuthorized = authService.isAuthorizedSubject.getValue();

            if (!isAuthorized) {
                router.navigate(['/onboarding'])
                return false;
            }
        }

        return true;
    }
}