#include <bits/stdc++.h>
using namespace std;

class TreeNode
{
public:
  int data;
  TreeNode *left;
  TreeNode *right;
};

TreeNode *getTreeNode(int data)
{
  TreeNode *node = new TreeNode();
  node->data = data;
  return node;
}

void preorder(TreeNode *node)
{
  if (node == NULL)
  {
    return;
  }

  cout << node->data << " ";
  preorder(node->left);
  preorder(node->right);
}

void inorder(TreeNode *node)
{
  if (node == NULL)
  {
    return;
  }

  inorder(node->left);
  cout << node->data << " ";
  inorder(node->right);
}

void findLeftSum(TreeNode *node, TreeNode *prev, int &sum)
{
  if (node == NULL)
  {
    return;
  }

  if (prev->left->data == node->data && node->right == NULL && node->left == NULL)
  {
    sum += node->data;
  }

  findLeftSum(node->left, node, sum);
  findLeftSum(node->right, node, sum);
}

int main()
{
  TreeNode *root = getTreeNode(1);
  root->left = getTreeNode(2);
  root->right = getTreeNode(3);
  root->left->left = getTreeNode(4);
  root->left->right = getTreeNode(5);
  root->right->left = getTreeNode(6);
  root->right->right = getTreeNode(7);

  // TreeNode *root = getTreeNode(3);
  // root->left = getTreeNode(9);
  // root->right = getTreeNode(20);
  // root->right->left = getTreeNode(15);
  // root->right->right = getTreeNode(7);

  // preorder(root);
  int sum = 0;
  findLeftSum(root, root, sum);
  cout << sum << endl;

  return 0;
}
