function fib(n: number): number {
	console.log(`Fibonacci is at: ${n}: `);
	if (n == 1) {
		return 0;
	}
	if (n == 2) {
		return 1;
	}
	return fib(n - 1) + fib(n - 2);
}

export default fib;
