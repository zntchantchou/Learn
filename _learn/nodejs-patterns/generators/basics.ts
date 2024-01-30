function* makeGenerator() {
	yield "Yielded result";
	console.log("Re entered");
}

const gen = makeGenerator();
console.log('gen ', gen);
console.log('next', gen.next());
