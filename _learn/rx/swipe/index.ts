console.clear();
import { fromEvent, iif, interval, of, pipe } from "rxjs";
import {
  finalize,
  mergeMap,
  takeUntil,
  takeWhile,
  repeat,
  map,
  tap,
  exhaustMap,
  delay,
  take,
} from "rxjs/operators";

const setRefreshPos = (y: number) => {
  const refreshElt = document.getElementById("refresh");
  if (refreshElt) refreshElt.style.top = `${y}px`;
};

const resetRefresh = () => setRefreshPos(10);

const setData = (data: string) => {
  const dataElt = document.getElementById("data");
  if (dataElt) dataElt.innerText = data;
};

const fakeRequest = () =>
  of(new Date().toUTCString()).pipe(
    tap((_) => console.log("request")),
    delay(1000)
  );

const takeUntilMouseUpOrRefresh$ = pipe(
  takeUntil<number>(fromEvent(document, "mouseup")),
  takeWhile((y: number) => y < 110)
);

const moveDot = (y:number) => of(y).pipe(tap(setRefreshPos));

const refresh$ = of({}).pipe(
  tap(resetRefresh),
  tap((e) => setData("...refreshing...")),
  exhaustMap((_) => fakeRequest()),
  tap(setData)
);

fromEvent(document, "mousedown")
  .pipe(
    mergeMap((e) => {
      console.log('Event', e)
      return fromEvent(document, "mousemove")
    }),
    // @ts-ignore
    map((e: Event) => e.clientY),
    takeUntilMouseUpOrRefresh$,
    finalize<number>(resetRefresh),
    exhaustMap((y: number) => iif(() => y < 100, moveDot(y), refresh$)),
    finalize(() => console.log("end")),
    repeat()
  )
  .subscribe();



  // Why do we need repeat ? 
  // You would not add an eventListener twice in JS
  // is it what is happening ? 
 