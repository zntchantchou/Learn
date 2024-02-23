#include <stdio.h>

void main() {
  int marks[] = {99,67,78,56,88,90,34,85};
  printf("Address \n");
  int* baseAddress = &marks[0];
  int* secondAddress = &marks[1];
  int* secondAddressByOffset = &marks[0] + 1;

  printf("BaseAddress : %p\n", baseAddress);
  printf("Second address: %p\n", secondAddress);
  printf("Second address by adding an offset: %p\n", secondAddressByOffset);
  printf("Size of an int %zu \n", sizeof(int));
  printf("Size of an int pointer %zu \n", sizeof(int*));
}