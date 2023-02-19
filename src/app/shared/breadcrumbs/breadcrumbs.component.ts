import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent  implements OnDestroy{
  public titulo: string = '';
  public tituloSub$: Subscription;

  constructor(private router: Router) {
    this.tituloSub$ = this.getArgumentosRuta().subscribe((event) => {
      if (event instanceof ActivationEnd) {
        if (event.snapshot.data['titulo']) {
          this.titulo = event.snapshot.data['titulo'];
          document.title = `AdminPro ${this.titulo}`;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe(); //Es importante cancelar la subscripcion y no generar un memory leak
  }

  getArgumentosRuta() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd)
    );
  }
}
