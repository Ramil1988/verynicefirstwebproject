# Twitter project

This project is a Twitter clone. 

Twitter is a social network/"micro-blogging" platform. You must be registered to post, but tweets are public and can be seen by non-registered users. Every twitter user chooses a username, often called a "handle". Conventionally, the handle is prefixed with an "@" symbol (eg. `@misswhatever`).

A "tweet" is a post, limited to 280 characters. Tweets can include media like photos or videos. Our clone will have limited media support.

Every profile as a "feed". A feed is a series of tweets. A user's profile feed shows all of the tweets they've posted, plus all of the tweets they've shared.

Users can follow each other. Unlike friends on facebook, following does not require mutual consent.

Every user has a "home feed". The home feed is a list of tweets that have been posted by the people that you follow. If you follow 100 accounts, your home feed will be a stream of tweets from those 100 people, along with things that those 100 people choose to "retweet".

A retweet is a way of sharing a tweet. If I follow `@koolkat`, and Kool Kat really likes Metallica, I may start seeing Metallica tweets in my home feed if Kool Kat retweets them.

## Functionality

This application includes the following features:

### View a single tweet

![Single tweet view](./assets/screenshots/single-tweet-view.png)

When the user navigates to `/tweet/:tweetId`, they should see the details for the specified tweet.

---

### View a "home feed"

When navigating to the root URL `/`, the user should see a list of tweets from the accounts that the current user follows.

![Home feed view](./assets/screenshots/index-view.gif)

---

### View a profile page

When navigating to `/:profileId`, information about that user is displayed, above a list of that user's tweets (and retweets):

![Home feed view](./assets/screenshots/profile-view.png)

---

### Liking a tweet

When clicking the "like" button, it should increment the # of likes. Clicking again should "unlike" the tweet.

![liking tweets](./assets/screenshots/like-tweet.gif)

---

### Posting a new tweet

On the homepage, the user should be able to create a new tweet by writing in the box and clicking "Meow":

![Posting a new tweet](./assets/screenshots/post-tweet.gif)

It should show up in the feed below after posting.

The API makes information available at `/api/me/profile`.

## Character limit

Twitter allows tweets up to 280 characters. There is a display a "remaining characters" indicator, which shifts colors as the user approaches/surpasses the limit:

![Character counter](./assets/screenshots/character-count.gif)

Specifically, here are the rules:

- Should become yellow when 80% of the limit is used up (55 characters remaining)
- Should become red when the number dips into the negatives.
- Should not be able to submit a tweet that has exceeded the limit.

---

## Error screens

Certain requests will fail 5% of the time. The API endpoints that can fail are:

- GET /api/me/home-feed
- GET /api/me/profile
- GET /api/tweet/:tweetId
- POST /api/tweet

For the GET endpoints, you can create an error screen, and show it if the request fails:

![Failure screen](./assets/screenshots/failure.png)

The "bomb" icon is imported from the "noto emoji" collection, in react-icons:

The POST /api/tweet endpoint is the one used for creating new tweets. You'll want to let the user know that their attempt to post a new tweet failed, and encourage them to try again.

This way you'll get an error every time, which can be helpful when developing.

---

## Loading states

The initial loading experience should look something like this:

![Spinners shown during loading](./assets/screenshots/loading-states.gif)

Note that there are two separate spinners shown.

The very first request is because we're fetching data about the current user. Once we have the current user, we can request data about the current route's data. In this GIF, we're loading the home feed, so we show a spinner while fetching the tweets to be shown.
