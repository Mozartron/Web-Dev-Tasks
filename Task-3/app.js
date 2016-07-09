var mysql  = require('mysql');
var fs = require('fs');
var url = require('url');
var path = require('path');
var formidable = require('formidable');
var bcrypt = require('bcryptjs');
var http = require('http');
var dbconn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : "pandora'sbox",
  database : 'mydb'
});

/*dbconn.connect(function(err){
  if(err){
    console.log('Database conn error');
  }else{
    console.log('Database conn successful');
  }
});

var record= { username: 'Ram Kumar', email: 'abcd@domain.com' };

dbconn.query('INSERT INTO users SET ?', record, function(err,res){
  if(err) throw err;

  console.log('Last record insert id:', res.insertId);
});*/

dbconn.connect(function(err){
  if(err)
    console.log("Error connecting to db");
  else
    console.log("Connection successful");
});

dbconn.query("DROP TABLE users",function(err,result){
});

dbconn.query("CREATE TABLE users(path varchar(100),username varchar(50) NOT NULL UNIQUE,password varchar(50) NOT NULL,email varchar(50) NOT NULL,phone varchar(10) NOT NULL)",function(err,result){
  if(err)
    console.log("Error creating table");
  else
    console.log("table created");
});
http.createServer(function(request,res){
    if(request.method.toLowerCase()==='get')
    {
      if(url.parse(request.url).pathname==='/profile')
         Login(res);
      else
         Register(res); 
    }
    else if(request.method.toLowerCase()==='post')
        formInput(request,res);
}).listen(3000);

function Login(res){
  fs.readFile('login.html',function(err,data){
    if(err)
    { res.end("Error");
      }
  else
    {
      res.writeHead(200,{'Content-type':'text/html','Content-length':data.length});
      res.write(data);
      res.end();
     }
    
  });
}

function showProfile(request,res,post)
{
  dbconn.query('SELECT * FROM users WHERE username=?',post.username,function(err,rows,fields)
  {
    if(err)
     {res.end("Some Error has occurred");
      }
    else
    {if(rows.length>0&&bcrypt.compareSync(post.password,rows[0].password))
      {  
       
         var body = '<html><head><style>body{color:#FFF;font-family:Verdana;text-align:center;font-size:30px;font-weight:500;background: linear-gradient(to left, #24C6DC , #514A9D);}</style></head><body><ul><li>Username : '+rows[0].username+'</li><li>Email : '+rows[0].email+'</li><li>Phone : '+rows[0].phone+'</li><br><a href="http://localhost:3000">Logout</div></a></body>';
         res.writeHead(200,{'Content-type':'text/html'});
         res.write(body);
       
       }
      else
       res.end("Either Username or Password is wrong");
    }

  });
            
}



function formInput(request,res)
{
  var post=
  {
        path : '',
        username :'',
        password:'',
        email:'',
        phone:''
  };
  
  var confirm='',i=0;
  var fields=[];
  
  var form = new formidable.IncomingForm();
  
  form.on('file',function(name,file)
   {
         console.log(file);
         if(file.name==='')
         post.path=__dirname+'/batman.jpg';
         
         else
          post.path=file.path;
    });
  

  form.on('field',function(field,value)
  {
   fields[field]=value;
   i++;
     if(i===1)
         post.username = value;
    
     else if(i===2)
        post.password= value;
     
     else if(i===3)
         confirm=value;
    
     else if(i===4)
       post.email=value;
    
     else if(i===5)
         post.phone = value;
    });
      

  form.on('end',function()
  {
     if(i===5)
      {
        if(post.username!==''&&post.passowrd!==''&&post.password===confirm)
        {
          var salt = bcrypt.genSaltSync(1);
          var hash = bcrypt.hashSync(post.password,salt);
          post.password = hash;
          dbconn.query('INSERT INTO users SET ?',post,function(err,result)
          {
                console.log("Inserted");
                Register(res);
          });
        }
        
        else if(post.username===''||post.passowrd==='')
        {
          res.end("Username and Password field should not be left blank");
        }
        
        else 
        {
         res.end("Re-enter your password");
         }
       }
        
     else if(i===2)
     {
       showProfile(request,res,post);
      }
  });
    form.parse(request);
}


function Register(res)
{
  fs.readFile('index.html',function(err,data)
  {
   res.writeHead(200,{'Content-type':'text/html','Content-length':data.length});
   res.write(data);
   res.end(); 
  });
}

console.log("Server is running at http://127.0.0.1:3000");



/*dbconn.end(function(err) {
  // Function to close database conn
});*/
