#include <stdio.h>


void main()
{
  printf("[declaration.c]");
  int i, marks[10];
  for (i = 0; i < 10; i++)
  {
    marks[i] = -1;
    printf("mark: %d \n", marks[i]);
  }

  int j;
  float salaries[5];
  for (j = 0; j < 5; j++)
  {
    salaries[j] = 1000 * j / 3;
    printf("salary: %f \n", salaries[j]);
  }

  int h;
  char name[8];
  for (h = 0; h < 5; h++)
  {
    name[h] = 'a';
    printf("letter: %c \n", name[h]);
  }
}
