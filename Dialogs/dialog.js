var builder = require('botbuilder');

const bot_reply = require('../bot_reply');
const test = require('../sqltest')
const rp =  require('request-promise-native')

module.exports = (bot) => {
    
    bot.dialog('mainDialog',[
        function(session){
            var res = "How comfortable you are with the rellocation"
            sendGetSentimentRequest(session.message.text).then(function (parsedBody){
                var score = parsedBody.documents[0].score.toString();
                var convID = session.message.address.conversation.id;
                var id = session.message.address.user.id;
                console.log("sentiment score is .................."+score)
                var query = "insert into hrsurveydata values ('"+id+"','"+session.message.text+"','"+res+"','"+convID+"','"+score+"',CURRENT_TIMESTAMP)"
                test(query,(rows)=>{
                    console.log("Logs inserted successfully")                    
                });
            })
            builder.Prompts.text(session,res)
        },
        function(session,results){
            var res = "Were you able to find a suitable place to live ?"
            if(results.response.toLowerCase().length>0){
                var comf = results.response
                builder.Prompts.text(session,res)
                sendGetSentimentRequest(session.message.text).then(function (parsedBody){
                    console.log(parsedBody)
                    var score = parsedBody.documents[0].score.toString();
                    var convID = session.message.address.conversation.id;
                    var id = session.message.address.user.id;
                    var query = "insert into hrsurveydata values ('"+id+"','"+session.message.text+"','"+res+"','"+convID+"','"+score+"',CURRENT_TIMESTAMP)"
                    test(query,(rows)=>{
                        console.log("Logs inserted successfully")                    
                    });
                })
            }
        },
        function(session,results){
            var res = 'Were you able to manage the cost of moving to the different place ?'
            builder.Prompts.text(session,res)
            sendGetSentimentRequest(session.message.text).then(function (parsedBody){
                console.log(parsedBody)
                var score = parsedBody.documents[0].score.toString();
                var convID = session.message.address.conversation.id;
                var id = session.message.address.user.id;
                var query = "insert into hrsurveydata values ('"+id+"','"+session.message.text+"','"+res+"','"+convID+"','"+score+"',CURRENT_TIMESTAMP)"
                test(query,(rows)=>{
                    console.log("Logs inserted successfully")                    
                });
            })
        },
        function(session,results){
            var res = 'How suited employee is to the new locality ?'
            builder.Prompts.text(session,res)
            sendGetSentimentRequest(session.message.text).then(function (parsedBody){
                console.log(parsedBody)
                var score = parsedBody.documents[0].score.toString();
                var convID = session.message.address.conversation.id;
                var id = session.message.address.user.id;
                var query = "insert into hrsurveydata values ('"+id+"','"+session.message.text+"','"+res+"','"+convID+"','"+score+"',CURRENT_TIMESTAMP)"
                test(query,(rows)=>{
                    console.log("Logs inserted successfully")                    
                });
            })
        },
        function(session,results){
            var res = 'Were there any problems for your family in relocation ?'
            builder.Prompts.text(session,res)
            sendGetSentimentRequest(session.message.text).then(function (parsedBody){
                console.log(parsedBody)
                var score = parsedBody.documents[0].score.toString();
                var convID = session.message.address.conversation.id;
                var id = session.message.address.user.id;
                var query = "insert into hrsurveydata values ('"+id+"','"+session.message.text+"','"+res+"','"+convID+"','"+score+"',CURRENT_TIMESTAMP)"
                test(query,(rows)=>{
                    console.log("Logs inserted successfully")                    
                });
            })
        },
        function(session,results){
            var res = 'What has been the biggest challenge in relocating ?'
            builder.Prompts.text(session,res)
            sendGetSentimentRequest(session.message.text).then(function (parsedBody){
                console.log(parsedBody)
                var score = parsedBody.documents[0].score.toString();
                var convID = session.message.address.conversation.id;
                var id = session.message.address.user.id;
                var query = "insert into hrsurveydata values ('"+id+"','"+session.message.text+"','"+res+"','"+convID+"','"+score+"',CURRENT_TIMESTAMP)"
                test(query,(rows)=>{
                    console.log("Logs inserted successfully")                    
                });
            })
        },
        function(session,results){
            var res = 'Do you feel that relocation bonus provided to you was sufficient?'
            builder.Prompts.text(session,res)
            sendGetSentimentRequest(session.message.text).then(function (parsedBody){
                console.log(parsedBody)
                var score = parsedBody.documents[0].score.toString();
                var convID = session.message.address.conversation.id;
                var id = session.message.address.user.id;
                var query = "insert into hrsurveydata values ('"+id+"','"+session.message.text+"','"+res+"','"+convID+"','"+score+"',CURRENT_TIMESTAMP)"
                test(query,(rows)=>{
                    console.log("Logs inserted successfully")                    
                });
            })
        },
        function(session,results){
            var res = 'Thanks ! You response is valuable for us. We will work on it and try to modify the services as requested.'
            session.endDialog(res)
            sendGetSentimentRequest(session.message.text).then(function (parsedBody){
                console.log(parsedBody)
                var score = parsedBody.documents[0].score.toString();
                var convID = session.message.address.conversation.id;
                var id = session.message.address.user.id;
                var query = "insert into hrsurveydata values ('"+id+"','"+session.message.text+"','"+res+"','"+convID+"','"+score+"',CURRENT_TIMESTAMP)"
                test(query,(rows)=>{
                    console.log("Logs inserted successfully")                    
                });
            })
        }
    ]).triggerAction({
        matches: /hi/ig
    });

    function sendGetSentimentRequest(message) {   
        var header = {'Content-Type':'application/json', 
                        'Ocp-Apim-Subscription-Key':'ac14454bc86841c4b90cfdb8a937f3b2'}   
        var options = {        
           method: 'POST',        
           uri:
            //'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment', 
            'https://centralus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment',       
           body: {            
              documents:[{id:'1', language: 'en', text:message}]  
           },        
           json: true, // Automatically stringifies the body to JSON
           headers: header    
        };    
        return rp(options);
    }
};