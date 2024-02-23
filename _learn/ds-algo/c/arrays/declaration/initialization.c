#include <stdio.h>

void main()
{
  printf("Initialization \n");

  int marks[5] = { 14, 15, 11, 19, 5};

  // size can be omitted
  int grades[] = {16, 15, 11, 19, 5};

  int scores[4] = { 14, 15};

 // values left blanks, scores[2] and scores[3] default to 0 

  for(int i = 0; i < 4; i++) {
    printf("score: %d , sizeof scores: %lu\n", scores[i], sizeof(scores));
  }
}
