import { Routes } from "@angular/router";
import { authGuard } from "./core/auth.guard";
export const routes: Routes = [
    {
        path:'', //!router para raiz localhost:4200/
        loadComponent: () =>
            import('./features/home/home/home')
        .then((m) => m.Home),
    },
    {
        path:'produto', //!router para produtos localhost:4200/
        loadComponent: () =>
            import('./features/produtos/lista-produtos/lista-produtos')
        .then((m) => m.ListaProdutos),
    },
    {
         path:'carrinho', //!router para carrinho localhost:4200/
         canActivate: [authGuard],
        loadComponent: () =>
            import('./features/carrinho/carrinho/carrinho')
        .then((m) => m.Carrinho),
    },
    {
         path:'**', //!router para qualquer outra rota que seja as rotas acima, redirecionando para a raiz localhost:4200/
         redirectTo: '/',
    },
];