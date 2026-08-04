import { HttpInterceptorFn } from "@angular/common/http";
import { error } from "console";
import { tap } from "rxjs";
import { catchError} from "rxjs";
import { throwError } from "rxjs";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
    console.log('Inteceptando Requisitação: ', req.url);
    //! aqui você pode  add logica para modificar a requisitação
    const token = 'fake-token-jwt';
    const novaReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,

        },
    });
    return next(novaReq).pipe(
        tap ({
            next: (event) => console.log('Responde: ', event),
            error: (error) => console.error('Erro de Requisitação ', error)
        }),
        catchError((error) => {
             console.error('Erro de Requisitação global:', error);
        if (error.status === 401) {
            
            console.warn('Erro de autenticação de Usuario: ', error);
            
        }
        if (error.status === 500) {
         console.warn('Erro interno do servidor!', error);
        }
         return throwError(() => error);
        })
    );
}; 