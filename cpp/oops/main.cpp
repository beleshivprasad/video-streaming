#include <iostream>
#include <list>
#include <string>

using namespace std;

class Video
{
  string title;
  string description;
  long likes;
  long dislikes;

  friend ostream &operator<<(ostream &os, const Video &video)
  {
    os << "Title: " << video.title << endl;
    os << "Description: " << video.description << endl;
    os << "Likes: " << video.likes << endl;
    os << "Dislikes: " << video.dislikes << endl;
    return os;
  }
};

class YouTubeChannel
{
  string name;
  string email;
  string ownerName;
  long long subscribers;
  list<Video> publishedVideos;

public:
  YouTubeChannel(string channelName)
  {
    this->name = channelName;
  };

  string getChannelName()
  {
    return this->name;
  };
  string getChannelEmail()
  {
    return this->name;
  };
  string getOwnerName()
  {
    return this->name;
  };
  long long getSubscribers()
  {
    return this->subscribers;
  };
  list<Video> getPublishedVideoList()
  {
    return publishedVideos;
  };
};

int main()
{

  YouTubeChannel *shiv = new YouTubeChannel("Scavy Gaming");

  list<Video> publishedVideos = shiv->getPublishedVideoList();

  cout << shiv->getChannelEmail() << endl;
  cout << shiv->getSubscribers() << endl;

  return 0;
}
