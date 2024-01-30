import List from "./list.js";

const users = new List();

users.append("Maria");
users.append("Dumbo");
users.append("Joker");
users.append("Karen");

console.log(users);
console.log("USERS 2", users.toString());
console.log("users ", users);

users.insert(undefined, "Mannie");
console.log("users LAST", users);
