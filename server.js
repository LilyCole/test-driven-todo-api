// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 7, task: 'Laundry', description: 'Wash clothes' },
  { _id: 27, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 44, task: 'Homework', description: 'Make this app super awesome!' },
  { _id: 24, task: 'Cook', description: 'Cook dinner' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
  var searchTodos={};
  searchTodos['todos']=[];
  var search=req.query.q;
  todos.forEach(function(value,index) {
    if((value['description'].indexOf(search) !== -1) || (value['task'].indexOf(search) !== -1)) {
      searchTodos['todos'].push(value);
    }
  });
  res.json(searchTodos);
});

app.get('/api/todos', function index(req, res) {
  res.json({todos});
});

app.post('/api/todos', function create(req, res) {
  var postTodo = {};
  var task = req.body.task;
  var description = req.body.description;
  var id = todos.length;
  for(var i=0; i<todos.length;i++){
    if(todos[i]._id==id) {
      id+=1;
    }
  }
  postTodo['_id'] = id;
  postTodo['task'] = task;
  postTodo['description'] = description;
  todos.push(postTodo);
  res.json(postTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  var id = req.params.id;
  var showTodo;
  for(var i=0; i<todos.length;i++){
    if(todos[i]._id==id) {
      showTodo=todos[i];
    }
  }
  res.json(showTodo);
});

app.put('/api/todos/:id', function update(req, res) {
  var updateTodo;
  var id = +req.params.id;
  var task = req.body.task;
  var description = req.body.description;
  for(var i=0; i<todos.length;i++){
    if(todos[i]._id==id) {
      todos[i].task = task;
      todos[i].description = description;
      updateTodo=todos[i];
    }
  }
  res.json(updateTodo);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var id = req.params.id;
  for(var i=0; i<todos.length;i++){
    if(todos[i]._id==id) {
      todos.splice(i,1);
    }
  }
  res.json("Success");
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
