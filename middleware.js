module.exports = {
    logIncomingMessage: function (session, next) {
        console.log("-------------Incoming message -----------");
        console.log(session.message.text);
        next();
    },
    logOutgoingMessage: function (event, next) {
        console.log("-------------Outgoing message -----------")
        console.log(event.text);
        next();
    },
    getSkypeID: function(session,next){
        //session.privateConversation.skypeID = session.message.address.user.id;
        //console.log("Skype user id is... "+ session.privateConversation.skypeID);
        next();
    }
}