# Page 1

### Quote 

>"Digital signatures provide part of the solution, but the main benefits
 are lost if a trusted third party is still required to prevent **double-spending**"

### Explanation 

 Double spending is a fundamental flaw in a digital cash protocol in which the same single digital token can be spent more than once

### Quote

>"Messages are broadcast **on a best effort basis**"

### Explanation 

Best effort, en matière de réseau de télécommunication, désigne la nature d'un service où la seule garantie de bonne transmission est que le réseau fera au mieux de ce qui est possible.

Avec ce service, le réseau n'exerce pas de contrôle de flux sur les sources de données en fonction de la capacité des destinations à les accepter. Les paquets d'information sont acheminés de nœud en nœud du réseau avec des files d'attente dans chacun. Ces files ayant une capacité volontairement limitée pour préserver des temps courts de traversée du réseau, les paquets qui devraient être ajoutés à une file qui se trouve saturée sont éliminés. Il en résulte que le réseau ne peut pas garantir par lui-même un taux de transmission de données sans pertes.

Des sources rapides émettant en continu vers une destination lente imposent au réseau, pour cette destination, un taux de perte qui peut être arbitrairement élevé. Il revient donc aux destinations qui détectent des pertes de les signaler aux sources afin que celles-ci réduisent leur débit d'émission. Le contrôle de flux est ainsi confié à un protocole entre ordinateurs utilisateurs, de bout en bout.

### Quote

>"We need a way for the payee to know that the previous owners did not sign any earlier
transactions.
For our purposes, **the earliest transaction** is the one that counts, so **we don't care
about later attempts to double-spend**."

### Explanation

(chatGPT)  The earliest transaction that "spends" those coins is the one that matters. Subsequent attempts to double-spend (spending the same coins twice) are not of concern to the payee because once the earliest transaction is confirmed and added to the blockchain, any later double-spending attempts become irrelevant for that particular recipient.

(Not chatGPT) The consensus of the validators as to which token was received first will ensure only one transation is validated if more than one transactions are competing.   


# Page 3

### Quote 
>"*For our timestamp network, we implement the proof-of-work **by incrementing a nonce in the
block** until a value is found that gives the block's hash the required zero bits.*"

### Explanation 


In Bitcoin mining, the term "nonce" refers to a 32-bit (4-byte) field within a block's header that miners can modify in order to generate a hash value that meets the difficulty target set by the network. The mining process involves finding a nonce value that, when combined with other block header data, produces a hash value (after hashing) that is below a certain target threshold.



# Page 4

### Quote 

>"*A block header with no transactions **would be about 80 bytes***"

A Bitcoin block header consists of several fields:

1. Version (4 bytes): This field indicates the version of the block.
2. Previous Block Hash (32 bytes): The cryptographic hash of the previous block's header.
3. Merkle Root (32 bytes): The root of the Merkle tree, which represents all transactions in the block.
4. Timestamp (4 bytes): The time the block was mined, recorded as a Unix timestamp.
5. Difficulty Target (4 bytes): The current target threshold for mining a block.
6. Nonce (4 bytes): A value that miners change to find a hash below the target.

# Page 5

### Quote 

>"Normally there will be either *a single input from a larger previous transaction or multiple inputs combining smaller amounts*, and *at most two outputs: one for the payment, and one returning the change, if any, back to the sender.*"

Example (ChatGpt)

If you received 1 bitcoin from one source and 4 bitcoins from another and want to send a total of 4.5 bitcoins to someone, the transaction would have two inputs (1 bitcoin and 4 bitcoins) and two outputs: one sending 4.5 bitcoins to the recipient and potentially one output for any change that might be sent back to your address if the inputs exceed the 4.5 bitcoins being sent.

Explained as **UTXO**s [=> link to article](https://satoshispeaks.com/bitcoins-utxo-model-for-handling-transactions/)

At any point in time, we have a full record of all “unspent” transactions (i.e., the outputs). This model of storing and keeping track of unspent transactions is called the UTXO (Unspent Transaction Output) model.

A user’s wallet keeps track of a list of unspent transactions associated with all addresses owned by the user. Logically, the balance of the wallet is the sum of those unspent transactions.\

Let’s look at an example.

Let’s assume that Bob’s wallet has 5 unspent bitcoins.
Alice, another user in the network, owns 1 unspent bitcoin.
Bob wants to give Alice 2 bitcoins. In order to send 2 bitcoins, he has to send the unspent 5 bitcoins to Alice as the input to the transaction. This transaction then returns 3 bitcoins to Bob as output in the form of a new UTXO (often known as “change”). This UTXO is signed back to a newly created address that is owned by Bob.
Alice’s wallet now has a balance of 3 bitcoins. She has two UTXOs: one from before and another from the bitcoin she just received from Bob. If she wants to send these bitcoins to others, she can use the UTXOs as inputs.

# Page 6

### Quote 
>"*As an additional firewall, **a new key pair should be used for each transaction** to keep them
from being linked to a common owner.*"

The public key is derived from the private key using mathematical algorithms, and while the public key is derived from the private key, the private key is the crucial piece of information that allows someone to control the associated funds.

### Explanation

When someone wants to update their key pair for enhanced security or privacy reasons, they generate a new private key, which then generates a new public key. This process involves creating a new Bitcoin address associated with the new key pair.


### Quote 
>"*As an additional firewall, **a new key pair should be used for each transaction** to keep them
from being linked to a common owner.*"

### Explanation

>"*
The receiver generates a new key pair and gives the public key to the sender shortly before
signing. This prevents the sender from preparing a chain of blocks ahead of time by working on
it continuously until he is lucky enough to get far enough ahead, then executing the transaction at
that moment. Once the transaction is sent, the dishonest sender starts working in secret on a
parallel chain*"
By continuously working on a series of blocks privately until the sender accumulates enough blocks in their secret chain, they could manipulate the blockchain and execute a transaction at a specific point when their chain becomes longer than the public chain. This is commonly referred to as a "51% attack" where an entity controls the majority of the computational power in the network and can attempt to manipulate the blockchain's history.

Including a timestamp requirement and ensuring that transactions are validated based on when they were included in the blockchain helps prevent such manipulations. Transactions must be included in a block that is timestamped and linked to the previous block, making it computationally expensive and practically infeasible for an attacker to alter the blockchain's history by precomputing blocks and executing transactions opportunistically.

### 
>"*As an additional firewall, **a new key pair should be used for each transaction** to keep them
from being linked to a common owner.*"


### Quote

context:  
p = probability an honest node finds the next block \
q = probability the attacker finds the next block \
qz = probability the attacker will ever catch up from z blocks behind

> $q^z$ = {  
&ensp; 1 if p ≤ q  \
&ensp; $(q / p)^z$  if p > q \
} 

### Example

p = 2 \
q = 1

Imagine the honest nodes are twice as fast as the attacker nodes  

After 2 blocks ( z = 2 )

$q^z$ = $(2 / 1)^2$ = 0.5 * 0.5 = 0.25 (25%)

After 4 blocks ( z = 4 )

$q^z$ = $(2 / 1)^4$ = 0.5 * 0.5 * 0.5 * 0.5  = 0.0625 (6.5%)

After 9 blocks ( z = 9 )

$q^z$ = $(2 / 1)^9$ = $0.5^9$  = 0.001953125 (0.19%)