#include <bits/stdc++.h>

using namespace std;

void bfs(vector<vector<int>> &alist, int v, int source, vector<int> &vis)
{
vis[source] = 1;

queue<int> que;
que.push(source);

while (!que.empty())
{
int front = que.front();
que.pop();
cout << " " << front;

    for (int i = 0; i < alist[front].size(); i++)
    {
      if (!vis[alist[front][i]])
      {
        vis[alist[front][i]] = 1;
        que.push(alist[front][i]);
      }
    }

}

cout << endl;
}

void bfsDiscrete(vector<vector<int>> &alist, int v)
{
int count = 0;
vector<int> vis(v + 1, 0);
for (int i = 0; i < v; i++)
{
if (!vis[i])
{
count++;
bfs(alist, v, i, vis);
}
}

cout << "total discrete graphs=" << count << endl;
}

void printAdjacencyList(vector<vector<int>> &alist)
{
for (int i = 0; i < alist.size(); i++)
{
cout << "node=" << i << " list=";

    for (int j = 0; j < alist[i].size(); j++)
    {
      cout << alist[i][j] << ",";
    }

    cout << endl;

}
}

int main()
{
int n = 10; // number of vertices 0-9
vector<vector<int>> edges = {{4, 3}, {1, 4}, {4, 8}, {1, 7}, {6, 4}, {4, 2}, {7, 4}, {4, 0}, {0, 9}, {5, 4}};

vector<vector<int>> alist(n);

for (int i = 0; i < edges.size(); i++)
{
alist[edges[i][0]].push_back(edges[i][1]);
alist[edges[i][1]].push_back(edges[i][0]);
}

printAdjacencyList(alist);
bfsDiscrete(alist, n);

return 0;
}
