import {Worker, workerData} from "worker_threads";
import fib from "../../fib/fib";

async function useWorker(iterations) {
	return new Promise((resolve, reject) => {
		// pass the number of iterations on fib to the worker
		const worker = new Worker('../../fib/worker.js', { workerData: { num: iterations }} );
		worker.once('online', () => {
			// console.log('worker is ready..');
		});

		worker.once('message', dataFromWorker => {
			console.log('[Worker] Sending message: ', dataFromWorker);
		  resolve(dataFromWorker);
		})

		worker.once('error', (err) => {
			console.log('[Worker] There was an error');
			reject(err);
		})

		worker.once('exit', code => {
			if (code !== 0) {
				reject(new Error(`Worker stopped with code:  ${code}`))
			}
		})
	})
}


async function run() {
	const promises = [
		useWorker(40),
		useWorker(40),
		useWorker(40),
		useWorker(40),
		useWorker(40),
		useWorker(40),
	]
	const start = Date.now();
 // waiting starts here with Promise.all
	const results = await Promise.all(promises);
	console.log('----- multi threaded version-----');
	console.log('results:\n', results);
	const end = Date.now();
	const totalTime = end - start;
	console.log('TOTAL TIME: ', totalTime, 'ms');
}

run();


