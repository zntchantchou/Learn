
#include <math.h>
#include <stdio.h>

double AttackerSuccessProbability(double attackerChances, int numberOfBlocks)
{
  double honestNodesChances = 1.0 - attackerChances;
  double avgOccurence = numberOfBlocks * (attackerChances / honestNodesChances);
  double sum = 1.0;
  int i, totalBlocks;
  for (totalBlocks = 0; totalBlocks <= numberOfBlocks; totalBlocks++)
  {
    double poisson = exp(-avgOccurence);
    for (i = 1; i <= totalBlocks; i++)
      poisson *= avgOccurence / i;
    sum -= poisson * (1 - pow(attackerChances / honestNodesChances, numberOfBlocks - totalBlocks));
  }
  return sum;
}

int main(void) {
  double attackerSuccessRate;
  int numberOfBlocksAfterTransaction;
  printf("Set attacker success rate between 0 and 1: \n");
  scanf("%lf", &attackerSuccessRate);
  printf("You chose: %.3lf \n", attackerSuccessRate);
  printf("Set number of blocks to evaluate: \n");
  scanf("%d", &numberOfBlocksAfterTransaction);
  double result = AttackerSuccessProbability(attackerSuccessRate, numberOfBlocksAfterTransaction);
  printf("Blocks : %d \n", numberOfBlocksAfterTransaction);
  printf("Attacker chances of success: %lf (%lf%%) \n", result, result * 100);
}
