function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Loggable() {
  this.log = log;
  this.loggable = true;
}

function log() {
  console.log(`I am loggable and I like to log my name ${this.name}`);
}


function Food(name, price) {
  Product.call(this, name, price);
  Loggable.call(this);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
console.log(new Food('cheese', 5).log());