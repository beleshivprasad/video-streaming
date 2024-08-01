#include <bits/stdc++.h>

using namespace std;

pair<int, int> count_bits(int n)
{
  int one_count = 0;
  int zero_count = 0;

  while (n)
  {
    if (n & 1)
    {
      one_count++;
    }
    else
    {
      zero_count++;
    }
    n >>= 1;
  }

  return pair<int, int>(one_count, zero_count);
}

int main()
{
  auto [x, y] = count_bits(5);
  cout << x << " " << y << endl;
  return 0;
}
