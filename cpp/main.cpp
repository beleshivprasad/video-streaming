#include <bits/stdc++.h>

using namespace std;

void fls(string s, int ind, queue<char> &que, int k)
{
  for (int i = ind + 1; i < s.size(); i++)
  {
    if (abs(que.front() - s[i]) <= k)
    {
      que.push(s[i]);
    }
  }
}

int main()
{

  int k = 15;
  string s = "eduktdb";
  string ans = "";

  for (int i = 0; i < s.length(); i++)
  {
    queue<char> que;
    que.push(s[i]);

    fls(s, i, que, k);

    if (ans.size() < que.size())
    {
      while (!que.empty())
      {
        ans += que.front();
        que.pop();
      }
    }
  }
  cout << "before " << ans << endl;
  cout << ans[ans.length() - 1] << " " << s[s.length() - 1] << endl;
  if ((abs(ans[ans.length() - 1] - s[s.length() - 1]) <= k) && ans[ans.length() - 1] != s[s.length() - 1])
  {
    ans += s[s.length() - 1];
  }

  if (abs(ans[0] - ans[1]) > k)
  {
    ans = ans.substr(1, ans.length() - 1);
  }
  cout << "after " << ans << endl;

  return 0;
}
