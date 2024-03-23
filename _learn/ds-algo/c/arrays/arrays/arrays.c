#include "arrays.h"
#include <stdio.h>
#include <stdlib.h>

int *arrayFromInput(int* length) {
  int i, n;
  int *arr;

  printf("Enter number of elements in the array: \n");
  printf("> "); 
  scanf("%d", length);
  // create array of size n
  arr = (int *)malloc(*length * sizeof(int));
  if (arr == NULL) {
    printf("Memory for array could not be allocated.");
    exit(0);
  }
  for (i = 0; i < *length; i++) {
    printf("Enter value at index %d: \n", i);
    printf("> ");
    scanf("%d", &arr[i]);
  }
  printf("Result: \n");
  for (i = 0; i < *length; i++) {
    printf("index: %d, value: %d \n", i, arr[i]);
  }
  return &arr[0];
}
