import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CardConfig } from '../../domain/models/configurations/card-config.model';

@Injectable({ providedIn: 'root' })
export class CardConfigApiService {
  getDefaultConfig(): Observable<CardConfig> {
    const mock: CardConfig = {
      title:      'Título de la tarjeta',
      subtitle:   'Subtítulo opcional',
      content:    'Este es el contenido de ejemplo de la tarjeta.',
      imageUrl:   'https://th.bing.com/th/id/R.f9675f08bedd8a12baea3fed2397c070?rik=NgCEukGSyZDwLQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f1%2f1%2f5%2f665979.jpg&ehk=BUP4W1peC%2fExKOxF53jbXjypoJJvMmiJoh1pGUYsKlk%3d&risl=&pid=ImgRaw&r=0',
      elevation:  2,
      fullWidth:  false
    };
    return of(mock).pipe(delay(500));
  }
}
