// given number of vertices and edges
// write a function to create adjacency list (graph representation)
// write a function to print the adjacency list (graph representation)
// write a bfs traversal function for graph ( should also traverse discrete graph if any)

#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> createAdjacencyList(vector<vector<int>> &edges, int v)
{
  vector<vector<int>> alist(v);

  for (int i = 0; i < edges.size(); i++)
  {
    alist[edges[i][0]].push_back(edges[i][1]);
    alist[edges[i][1]].push_back(edges[i][0]);
  }

  return alist;
}

void printAdjacencyList(vector<vector<int>> &alist)
{
  for (int i = 0; i < alist.size(); i++)
  {
    cout << "node=" << i << " ==> direct path = ";
    for (int j = 0; j < alist[i].size(); j++)
    {
      cout << alist[i][j] << ",";
    }
    cout << endl;
  }
}

void bfs(vector<vector<int>> &alist, int s, int d, vector<int> &vis, bool printValue = true)
{

  vis[s] = 1;
  queue<int> que;
  que.push(s);

  while (!que.empty())
  {
    int front = que.front();
    que.pop();

    if (printValue)
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
}

void bfsDiscontinous(vector<vector<int>> &alist, int v)
{
  vector<int> vis(v + 1, 0);
  int count = 0;
  for (int i = 0; i < v; i++)
  {
    if (!vis[i])
    {
      bfs(alist, i, 0, vis);
      cout << "\n";
      count++;
    }
  }

  cout << "total graphs = " << count << "\n\n";
}

void dfs(vector<vector<int>> &alist, int s, vector<int> &vis)
{
  vis[s] = 1;

  cout << " " << s;

  for (int i = 0; i < alist[s].size(); i++)
  {
    if (!vis[alist[s][i]])
    {
      dfs(alist, alist[s][i], vis);
    }
  }
}

void dfsDisontinous(vector<vector<int>> &alist, int v)
{
  int count = 0;
  vector<int> vis(v + 1, 0);
  for (int i = 0; i < v; i++)
  {
    if (!vis[i])
    {
      dfs(alist, i, vis);
      cout << "\n";
      count++;
    }
  }

  cout << "total graphs = " << count << "\n\n";
}

bool findIfPathExists(vector<vector<int>> &alist, int s, int d, int v)
{
  vector<int> vis(v + 1, 0);
  bfs(alist, s, d, vis, false);

  return vis[d];
}

int findDistanceBetweenTwoNodes(vector<vector<int>> &alist, int s, int d, int n)
{
  vector<int> vis(n, 0);
  vis[s] = 1;

  queue<pair<int, int>> que;
  que.push({s, 0});

  while (!que.empty())
  {
    auto [f, dis] = que.front();
    que.pop();

    if (f == d)
      return dis;

    for (int i = 0; i < alist[f].size(); i++)
    {
      if (!vis[alist[f][i]])
      {
        que.push({alist[f][i], dis + 1});
        vis[alist[f][i]] = 1;
      }
    }
  }
  return -1;
}

int main()
{

  // int n = 10; // number of vertices 0-9
  // vector<vector<int>> edges = {{4, 3}, {1, 4}, {4, 8}, {1, 7}, {6, 4}, {4, 2}, {7, 4}, {4, 0}, {0, 9}, {5, 4}};

  // int n = 6; // number of vertices 0-7
  // vector<vector<int>> edges = {{0, 1}, {0, 2}, {3, 5}, {5, 4}, {4, 3}};

  int n = 5; // number of vertices 0-4
  vector<vector<int>> edges = {{2, 0}, {4, 2}, {3, 1}, {1, 0}};

  vector<vector<int>> alist = createAdjacencyList(edges, n);
  // printAdjacencyList(alist);

  vector<int> vis(n + 1, 0);
  // bfsDiscontinous(alist, n);
  // dfsDisontinous(alist, n);
  // cout << findIfPathExists(alist, 0, 5, n) << endl;
  cout << findDistanceBetweenTwoNodes(alist, 0, 3, n) << endl;

  return 0;
}

// 0100
// 0001
// 0101
