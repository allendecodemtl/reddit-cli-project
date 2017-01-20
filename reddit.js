var request = require('request');
var requestPromise = require('request-promise');
var promptPromise = require('prompt-promise');
var inquirer = require('inquirer');




/*
This function should "return" the default homepage posts as an array of objects
*/
function getHomepage() {
  // Load reddit.com/.json and call back with the array of posts
  // TODO: REPLACE request with requestAsJson!

  // Fire request to reddit
  var redditURL = "https://www.reddit.com/.json";
  var homePromise = requestPromise(redditURL);

  return homePromise
    .then(function(homePageResults) {

      var homePageParsed = JSON.parse(homePageResults);

      //return homePageParsed.data.children; // Return array

      homePageParsed.data.children.forEach(function(item) {
        console.log(" | " + item.data.title);
      });

    })
}


/*
This function should "return" the default homepage posts as an array of objects.
In contrast to the `getHomepage` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedHomepage(sortingMethod, callback) {
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
}

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
*/
function getSubreddit() {
  // Load reddit.com/r/{subreddit}.json and call back with the array of posts

  var subredURL = "https://www.reddit.com";
  // Prompt user for subreddit
  var pPromise = promptPromise('Subreddit (e.g /r/montreal/):');

  return pPromise
    .then(function(pResult) {

      subredURL = subredURL + pResult + ".json";
      console.log(subredURL);
      // Fire request to subreddits
      var subredPromise = requestPromise(subredURL);
      return subredPromise;

    })
    .then(function(subredPageResults) {

      var subredParsed = JSON.parse(subredPageResults);

      //return subredditsParsed.data.children; // Return array

      subredParsed.data.children.forEach(function(item) {
        console.log(" | " + item.data.title);
      });
    })

}

/*
This function should "return" the posts on the front page of a subreddit as an array of objects.
In contrast to the `getSubreddit` function, this one accepts a `sortingMethod` parameter.
*/
function getSortedSubreddit(subreddit, sortingMethod, callback) {
  // Load reddit.com/r/{subreddit}/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
}

/*
This function should "return" all the popular subreddits
*/
function getSubreddits() {
  // Load reddit.com/subreddits.json and call back with an array of subreddits
  var subredditsURL = "https://www.reddit.com/subreddits.json";
  var subredURL = "https://www.reddit.com";

  // Fire request to subreddits
  var subredditsPromise = requestPromise(subredditsURL);

  return subredditsPromise
    .then(function(subredditsPageResults) {

      var subredditsParsed = JSON.parse(subredditsPageResults);

      var listSubReddits = subredditsParsed.data.children.map(function(res) {
        return {
          name: res.data.url,
          value: res.data.url
        };
      })

      return inquirer.prompt({
        type: 'list',
        name: 'listSub',
        message: 'What do you want to do?',
        choices: listSubReddits
      })

    })
    .then(function(answers) {
      
      subredURL = subredURL + answers.listSub + ".json";
      console.log(subredURL);
      
      var subredSelectedPromise = requestPromise(subredURL);
      return subredSelectedPromise;

    })
    .then(function(subredSelectedPageResults) {
  
      var subredSelectedParsed = JSON.parse(subredSelectedPageResults);

      subredSelectedParsed.data.children.forEach(function(item) {
        console.log(" | " + item.data.title);
      });
    });

}

// Export the API
module.exports = {
  // ...
  getHomepage: getHomepage,
  getSubreddit: getSubreddit,
  getSubreddits: getSubreddits

};
