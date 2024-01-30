import {fibAsync} from './fib.js';

import {parentPort, workerData, threadId} from 'worker_threads';

// this code is invoked directly when useWorker is called
const start = Date.now();

const result = await fibAsync(workerData.num);

const totalTime = Date.now() - start;

const message = {...result, threadId};

// send message back using the 'message' listener function in useWorker
parentPort.postMessage(message);
