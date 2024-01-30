// use this function to for a heavy computation
export default function fib(n) {
	// console.log(`Fibonacci is at: ${n}: `);
	if (n == 1) {
		return 0;
	}
	if (n == 2) {
		return 1;
	}
	return fib(n - 1) + fib(n - 2);
}

export function fibAsync(num, extraData = {}) {
	const start = Date.now();
	return new Promise(resolve => {
		// fib is synchronous, all we can do is wait, returning a promise does not make any difference		
		const result = fib(num)
		const end = Date.now();
		resolve({result, totalTime: end - start, ...extraData})
	})
}

