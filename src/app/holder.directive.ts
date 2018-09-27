import { Directive, Output, EventEmitter, HostListener } from '@angular/core';
import { Subject, Observable, interval } from 'rxjs';
import { takeUntil, tap, filter } from 'rxjs/operators';

@Directive({
  selector: '[holder]'
})
export class HolderDirective {
  @Output()
  intervalData: EventEmitter<number> = new EventEmitter<number>();

  state: Subject<string> = new Subject<string>();

  cancelInterval: Observable<string>;

  constructor() {
    this.cancelInterval = this.state.pipe(
      filter(state => state === 'cancel'),
      tap(value => {
        console.log('%c hold ended', 'color: #ef4343; font-weight: bold');
        this.intervalData.emit(0);
      })
    );
  }

  @HostListener('mousedown', ['$event'])
  onHold() {
    console.log('%c hold started', 'color: #5fba7c; font-weight: bold ');
    this.state.next('start');

    const intervalPercentage = 100;

    interval(intervalPercentage)
      .pipe(
        takeUntil(this.cancelInterval),
        tap(value => {
          this.intervalData.emit(value * intervalPercentage);
        })
      )
      .subscribe();
  }

  @HostListener('mouseleave', ['$event'])
  @HostListener('mouseup', ['$event'])
  cancelHold() {
    this.state.next('cancel');
  }
}
