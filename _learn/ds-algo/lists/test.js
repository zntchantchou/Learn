import List from "./list.js";

const users = new List();

users.append("Maria");
users.append("Dumbo");
users.append("Joker");
users.append("Karen");

// ITERATING
for(users.front(); users.currPos() < users.length(); users.next()) {
  console.log('users.getElement ', users.getElement());
}

const jedis = new List();
jedis.append('Anakin')
jedis.append('Darth Vader')
jedis.append('Darth Mall')
jedis.append('Mace Windu')

for(jedis.end(); jedis.currPos() >= 0; jedis.prev()) {
  console.log('the list', jedis)
  console.log('jedis', jedis.getElement());
  console.log('jedis', jedis.currPos());
}