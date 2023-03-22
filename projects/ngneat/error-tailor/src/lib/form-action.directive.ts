import { Directive, ElementRef, OnInit } from '@angular/core';
import { tap, fromEvent, Observable, Subject, takeUntil } from 'rxjs';

@Directive({
  standalone: true,
  selector: 'form[errorTailor]'
})
export class FormActionDirective implements OnInit {
  private submit = new Subject<Event | null>();
  private destroy = new Subject<void>();

  element = this.host.nativeElement;
  submit$ = this.submit.asObservable();
  reset$: Observable<Event> = fromEvent(this.element, 'reset').pipe(tap(() => this.submit.next(null)));

  constructor(private host: ElementRef<HTMLFormElement>) {}

  ngOnInit() {
    fromEvent(this.element, 'submit')
      .pipe(takeUntil(this.destroy))
      .subscribe(this.submit);
  }
}
