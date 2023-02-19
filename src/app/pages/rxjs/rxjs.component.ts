import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, Subscription } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy{

  public intervalSubs: Subscription;

  constructor() {

    //Si no hay nada suscrito, no se ejecuta

    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   (valor) => console.log('Subs:', valor),
    //   (error) => console.warn('Error:', error),
    //   () => console.info('Obs terminado')
    // );
    this.intervalSubs = this.retornaIntervalo().subscribe((valor) => console.log(valor));
  }

  ngOnDestroy(): void {
    /*
          ES IMPORTENTE NO TENER UNA FUJA DE MOMORIA
      Cuando cambiio de componente, se ejecuta el ngOnDestroy
      y se cancela la subscripcion
      Y asi no se genera un memory leak
      Una vez que regreso al componente, se vuelve a ejecutar el constructor
    */
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    const intervalo$ = interval(500).pipe(
      map((valor) => valor + 1),//para qie no inicien en 0
      filter((valor) => valor % 2 === 0),//Solo los valores true disparan el observable take
      take(10) //No puede ser mayor que el valor del intervalo
    );
    return intervalo$;
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 2) {
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });
    return obs$;
  }
}
