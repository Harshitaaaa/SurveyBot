var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var config = 
   {
     userName: 'Harshita', 
     password: 'Harsha@123', 
     server: 'hrsurvey.database.windows.net',
     
     options: 
        {
           database: 'hrsurvey' 
           , encrypt: true,
           rowCollectionOnRequestCompletion : true,
           requestTimeout : 2000
        }
   }
// var query = "select * from distributers";
// connectionRet(query,(rows)=>
// {
//     console.log(rows);
//     rows.forEach(function(element) {
//         console.log(element);
//     });
// });

// Attempt to connect and execute queries if connection goes through
function connectionRet(query,callback) {
    var connection = new Connection(config);
    connection.on('connect', function(err) 
   {
     if (err) 
       {
          console.log(err)
       }
    else
       {
           queryDatabase(connection,query,(rows)=>{
               callback(rows);
           });
       }
   }
 );
}

function queryDatabase(connection,query,callback)
   { console.log('Reading rows from the Table...');

       // Read all rows from table
     request = new Request(
          query.toString(),
             function(err, rowCount, rows) 
                {   
                    if(err){
                        console.log(err);
                        process.exit()
                    }
                    callback(rows);
                }
            );


    connection.execSql(request);
  }

  module.exports = connectionRet;