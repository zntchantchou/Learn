import { fromEvent, interval } from "rxjs";
import {
  exhaustMap,
  take,
} from "rxjs/operators";

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
  exhaustMap(() => interval(1000).pipe(take(5)))
);
result.subscribe(x => console.log('HIHI ', x));