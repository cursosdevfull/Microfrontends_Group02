import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: "",
        loadComponent: () => import('./menu/menu').then(m => m.Menu)
    },
    {
        path: "**",
        redirectTo: "",
    }
];
