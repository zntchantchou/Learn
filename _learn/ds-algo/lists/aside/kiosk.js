import List from "../list";
import { createArr } from "./readfile";

const movies = await createArr("./movies.txt");
const moviesList = new List();
for (let i = 0; i < movies.length; i++) {
  moviesList.append(movies[i]);
}

function Customer(name, movie) {
  this.movie = movie;
  this.name = name;
}

const josh = new Customer(
  "John",
  "The Lord of the Rings: The Fellowship of the Ring"
);
const malia = new Customer("Malia", "Inception");

console.log("[KIOSK] RESULT: ", moviesList);
// fromArray method on list would be nice
const customersList = new List();
customersList.append(malia);
customersList.append(josh);

function displayList(list) {
  for (list.front(); list.currentPosition() < list.length(); list.next()) {
    if (list.getElement() instanceof Customer) {
      console.log("----------- LIST ----------");
      console.log("[displayList] Customer name: ", list.getElement().name);
      console.log("[displayList] Customer Movie: ", list.getElement().movie);
      console.log("----------- LIST END ----------");
    } else {
      console.log("[displayList] list element: ", list.getElement());
    }
  }
}

function checkoutMovie(name, movie, moviesList, customersList) {
  const movieName = movie.toUpperCase();
  if (moviesList.contains(movieName)) {
    console.log("[checkOutMovie] ");
    const customer = new Customer(name, movieName);
    moviesList.remove(movieName);
    customersList.append(customer);
  } else {
    console.log("Movie not available");
  }
}

checkoutMovie("jack", "Star WaRs", moviesList, customersList);
displayList(customersList);
displayList(moviesList);
