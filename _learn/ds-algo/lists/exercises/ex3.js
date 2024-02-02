import List from "../list";

function Person(name, gender) {
  this.gender = gender;
  this.name = name; 
}


export function displayByGender() {
  const byGender = {};
  const elements = this.toString();
  console.log('display ByGender');
  for(let i = 0; i < this.size; i++) {
    if(!byGender[elements[i].gender]) {
      byGender[elements[i].gender] = [elements[i].name]
    } else {
      byGender[elements[i].gender].push(elements[i].name)
    }
  }
  console.log('BY GENDER ', byGender);
}


const people = [
  new Person("Zac", "M"),
  new Person("Layla", "F"),
  new Person("Cedric", "M"),
  new Person("Cedric", "T"),
  new Person("Natalie", "F"),
  new Person("Leo", "M"),
  new Person("Stacy", "F"),
  new Person("Priscilla", "F"),
];

// const peopleList = new List();
// people.forEach(p => peopleList.append(p))
// console.log('PPl list ', peopleList.toString())
// peopleList.displayByGender();