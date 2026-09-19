import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'inicio' },

    { path: 'inicio', loadComponent: () => import('./pages/inicio/inicio').then(m => m.Inicio) },
    { path: 'checkin', loadComponent: () => import('./pages/checkin/checkin').then(m => m.Checkin) },
    { path: 'conteudos', loadComponent: () => import('./pages/conteudos/conteudos/conteudos').then(m => m.Conteudos) },
    { path: 'conteudos/:slug', loadComponent: () => import('./pages/conteudos/leitura/leitura').then(m => m.Leitura) },
    { path: 'ajuda', loadComponent: () => import('./pages/ajuda/ajuda').then(m => m.Ajuda) },

    { path: 'admin', pathMatch: 'full', loadComponent: () => import('./pages/admin/login/login').then(m => m.Login) },
    {
        path: 'admin', loadComponent: () => import('./pages/admin/admin-shell/admin-shell').then(m => m.AdminShell),
        children: [
            { path: 'indicadores', loadComponent: () => import('./pages/admin/indicadores/indicadores').then(m => m.Indicadores) },
            { path: 'conteudos', loadComponent: () => import('./pages/admin/conteudos-admin/conteudos-admin').then(m => m.ConteudosAdmin) },
            { path: 'conteudos/:id', loadComponent: () => import('./pages/admin/conteudos-editor/conteudos-editor').then(m => m.ConteudosEditor) },
            { path: 'respostas', loadComponent: () => import('./pages/admin/respostas/respostas').then(m => m.Respostas) }
        ]
    },

    { path: '**', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) }
];
