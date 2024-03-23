#include "../arrays/arrays.h"
#include <stdio.h>

int main() {
  int *arrayLength;
  int *arr = arrayFromInput(arrayLength);
  printf("Length of the array: %d \n", *arrayLength);
  int i;
  int min = arr[0];
  if (*arrayLength > 1) {
    for (i = 1; i < *arrayLength; i++) {
      if (min > arr[i]) {
        min = arr[i];
      }
    };
  }
  printf("Minimum value is %d \n", min);
  return 0;
}
