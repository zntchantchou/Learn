CC = gcc 
CFLAGS = -Wall -Wextra -std=c99

all: address
address: address.o
		$(CC) $(CFLAGS) -o address address.o
address.o: address.c
		$(CC) $(CFLAGS) -c address.c 
clean: 
		rm -f address.o address
	