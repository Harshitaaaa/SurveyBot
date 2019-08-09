const hiMssg = ["Hey there","Hello","Ssupp?"],
    byeMssg = ["Byee","Adios","Cyaa...."],
    didntUnderstand = ["Sorry, i didnt understand that","Sorry i am not trained to answer that","Sorry, i didnt understand. But i am going to use this query/statement for my training"];
    
module.exports = {
    hiMssg: function () {
        return hiMssg[(Math.floor(Math.random() * hiMssg.length))];
    },
    byeMssg: function () {
        return byeMssg[(Math.floor(Math.random() * byeMssg.length))];
    },
    didntUnderstand: function () {
        return didntUnderstand[(Math.floor(Math.random() * didntUnderstand.length))];
    }
}