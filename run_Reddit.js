var inquirer = require('inquirer');
var redditFile = require('./reddit.js');


function runReddit() {
    var menuChoices = [{
        name: 'Show homepage',
        value: 'HOMEPAGE'
    }, {
        name: 'Show subreddit',
        value: 'SUBREDDIT'
    }, {
        name: 'List subreddits',
        value: 'SUBREDDITS'
    }];

    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What do you want to do?',
        choices: menuChoices
    })
    .then(function(answers) {
        
        console.log(answers.menu);
        
        if (answers.menu === 'HOMEPAGE'){
            // Get json homepage from function
            return redditFile.getHomepage()
        }
        else if (answers.menu === 'SUBREDDIT'){
            // Get json subreddits from function
            return redditFile.getSubreddit()
        }
         else if (answers.menu === 'SUBREDDITS'){
            // Get json subreddits from function
            return redditFile.getSubreddits();
        }
    })
    .then(function(res){
        runReddit();
    })
    
}


runReddit();

