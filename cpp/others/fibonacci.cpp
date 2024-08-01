#include <bits/stdc++.h>
using namespace std;

// The Tribonacci sequence Tn is defined as follows:

// T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

// Given n, return the value of Tn.

// Example 1:

// Input: n = 4
// Output: 4
// Explanation:
// T_3 = 0 + 1 + 1 = 2
// T_4 = 1 + 1 + 2 = 4
// Example 2:

// Input: n = 25
// Output: 1389537

int main()
{

  int n = 25;

  int t1 = 0;
  int t2 = 1;
  int t3 = 1;

  cout << t1 << " " << t2 << " " << t3 << " ";
  int sum = t1 + t2 + t3;

  int last = 0;
  for (int i = 4; i <= n+1; i++)
  {
    int tnext = t1 + t2 + t3;
    sum += tnext;
    cout << tnext << " ";
    last = tnext;
    t1 = t2;
    t2 = t3;
    t3 = tnext;
  }

  cout << endl
       << last << endl;

  return 0;
}
