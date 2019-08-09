/*-----------------------------------------------------------------------------
A simple Language Understanding (LUIS) bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var myMiddleware = require('./middleware');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());
server.get('/api/CustomWebApi', (req, res, next) => {
   //find the user's address in your DB as `savedAddress`
    var msg = new builder.Message().address("sip:harshita.badlani@taoautomation.com");
    msg.text('Hello, this is a notification');
    bot.send(msg);
    res.send('triggered');
    next();
  }
);

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
// This default message handler is invoked if the user's utterance doesn't
// match any intents handled by other dialogs.
var bot = new builder.UniversalBot(connector, function (session, args) {
    //qnamaker(smalltalk_qna_maker,session.message.text,(result)=>{
        //session.endDialog("I didn't understand. Please contact");
    //});
});

bot.set('storage', tableStorage);

bot.use({
    botbuilder: function (session, next) {
        myMiddleware.logIncomingMessage(session, next);
        //myMiddleware.getSkypeID(session,next);
        //console.log("Skype User ID is......"+session.privateConversation.skypeID)
    },
    send: function (event, next) {
        myMiddleware.logOutgoingMessage(event, next);
        
    },
    
});

bot.on('conversationUpdate', function(message){
    if (message.membersAdded[0].id === message.address.bot.id) {             
        var reply = new builder.Message()    
              .address(message.address)    
              .text("Hello, I'm SurveyBOT! ");        
        bot.send(reply);    
  }
})

require('./Dialogs/dialog')(bot);