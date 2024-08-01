const express = require('express');

const app = express();

// handle command line args
console.log(process.argv);

const PORT=5000;

// handle routing
app.get('/api/',(req,res)=>{
	res.send('hello client');
});

// listen server
app.listen(PORT,()=>{
	console.log('server started running on port ',PORT);
});
