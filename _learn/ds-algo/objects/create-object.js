function Checking(amount) {
 this.balance = amount;
 this.logInfo = function() {
  console.log('Logging Info : ')
  console.log('Info ', this.balance )
 }
}

const myAccount = new Checking(2);
const mySecondAccount = new Checking(100);
myAccount.logInfo();
mySecondAccount.logInfo();

