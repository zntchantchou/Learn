#include <stdio.h>

int main()
{
  int i;
  int nums[10];
  for (i = 0; i < 10; i++)
  {
    printf("Choose number for index %d:", i);
    scanf("%d", &nums[i]);
  }
  i = 0;
  printf("Final array : \n\n");
  for (i = 0; i < 10; i++)
  {
    printf("%d \n", nums[i]);
  }

  return 0;
}