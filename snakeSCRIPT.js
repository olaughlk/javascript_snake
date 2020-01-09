var grid = new Array(40);
for(var i=0;i<grid.length;i++){
  grid[i] = [];
}
for(var i=0;i<40;i++){
  for(var j=0;j<40;j++){
    if(i==0 || i==39||j==0||j==39){
      grid[i][j] = 'wall';
    }
    else{
      grid[i][j] = null;
    }
  }
}
var apple_pos = [10, 10];
var snake_len = 1;
var increase_snake_length = false;
var snake_direction = 'r';
var snake = [[1,1]];
var game_go = false;

start_game();

/*
Initialization for game board, array of 40 by 40
starting with null values everywhere except the edges
*/
function create_board(){
  //var grid = new Array(40);
  for(var i=0;i<grid.length;i++){
    grid[i] = [];
  }
  for(var i=0;i<40;i++){
    for(var j=0;j<40;j++){
      if(i==0 || i==39||j==0||j==39){
        grid[i][j] = 'wall';
      }
      else{
        grid[i][j] = null;
      }
    }
  }
}

/*
struct used for creating linked list of snake pieces
*/
/*
function snake_piece(loc, nxt){
  this.location = loc;
  this.next = nxt;
  this.direction;
}
*/

/*
useful features for keeping track of snake pieces,
snake will always start at 1,1 heading to the right
as of right now
*/

//var snake_head = new snake_piece([1,1], null);
//var snake_tail = new snake_piece([1,1], snake_head);

function create_snake(){
  var snake_len = 1;
  var increase_snake_length = false;
  var snake_direction = 'r';
  var snake = [[1,1]];
}
/*
apple position is later set as random this starting
position is meaningless
*/


function start_game(){
  //create_board();
  //create_snake();
  move_apple();
  paint_board();
  game_go = true;
  grid[1][1] = 'snake';
  play_game();
}

function end_game(){
  //clearInterval(run);
  alert(snake_len);
  game_go = false;
}
function change_snake_direction(direction){
  if((snake_direction=='r'&&direction!='l')||
     (snake_direction=='l'&&direction!='r')||
     (snake_direction=='u'&&direction!='d')||
     (snake_direction=='d'&&direction!='u')||
     (snake_len==1)){
    snake_direction = direction;
  }
}
//SEVERELY FLAWED!!!
function move_snake(){
  un_paint_snake(1);
  var next_pos = snake[0].slice(0,2);
  if(snake_direction=='r'){
    //console.log('r');
    next_pos[0]+=1;
  }else if(snake_direction=='l'){
    //console.log('l');
    next_pos[0]-=1;
  }else if(snake_direction=='u'){
    //console.log('u');
    next_pos[1]-=1;
  }else if(snake_direction=='d'){
    //console.log('d');
    next_pos[1]+=1;
  }
  snake.unshift(next_pos);
  check_collision(next_pos);
  found_apple(next_pos);
  un_paint_snake(0);
  if(increase_snake_length==false){
    var rem = snake.pop();
  }
  else{
    increase_snake_length=false;
    snake_len += 1;
  }
  paint_snake();
  //console.log(snake);
}

function check_collision(next_pos){
  if(grid[next_pos[0]][next_pos[1]]=='snake'||grid[next_pos[0]][next_pos[1]]=='wall'){
    end_game();
  }
}

function found_apple(next_pos){
  if(grid[next_pos[0]][next_pos[1]]=='apple'){
    increase_snake_length = true;
    move_apple();
  }
}

function move_apple(){
  var run_move_apple = true;
  while(run_move_apple){
    var x_apple = Math.floor(Math.random()*38)+1;
    var y_apple = Math.floor(Math.random()*38)+1;
    if(grid[x_apple][y_apple]==null){
      grid[x_apple][y_apple] = 'apple';
      grid[apple_pos[0]][apple_pos[1]]=null;
      apple_pos[0] = x_apple;
      apple_pos[1] = y_apple;
      run_move_apple = false;
    }
  }
  paint_board();
}

function un_paint_snake(a){
  if(a==1){
    for(var i=0;i<snake_len;i++){
      grid[snake[i][0]][snake[i][1]] = 'wall';
    }
  }else{
    for(var i=0;i<snake.length;i++){
      grid[snake[i][0]][snake[i][1]] = null;
    }
  }
}

function paint_snake(){
  for(var i=0;i<snake.length;i++){
    grid[snake[i][0]][snake[i][1]] = 'snake';
  }
}

function paint_board(){
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  for(var i=0;i<grid.length;i++){
    for(var j=0;j<grid.length;j++){
      ctx.beginPath();
      if(grid[i][j] == 'wall'){
        ctx.rect(i*10, j*10, 10, 10);
        ctx.fillStyle = "#5c8f9c";//pink
        ctx.fill();
      }
      else if(grid[i][j] == 'snake'){
        ctx.rect(i*10, j*10, 10, 10);
        ctx.fillStyle = '#64b560';//green
        ctx.fill();
      }
      else if(grid[i][j] == 'snakeb'){
        ctx.rect(i*10, j*10, 10, 10);
        ctx.fillStyle = 'blue';
        ctx.fill();
      }
      else if(grid[i][j] == 'apple'){
        ctx.rect(i*10, j*10, 10, 10);
        ctx.fillStyle = '#ba2323';//red
        ctx.fill();
      }
      else if(grid[i][j] == null){
        ctx.rect(i*10, j*10, 10, 10);
        ctx.fillStyle = '#02313d';
        ctx.fill();
      }
      else{
        ctx.rect(i*10, j*10, 10, 10);
        ctx.fillStyle = '#02313d'
        ctx.fill();
      }
      ctx.closePath();
    }
  }
}



function play_game(){
  //var run = setInterval(function(){
    document.onkeydown = function(event){
      var a = event.keyCode;
      switch (a){
        case 37:
          change_snake_direction('l');
          break;
        case 38:
          change_snake_direction('u');
          break;
        case 39:
          change_snake_direction('r');
          break;
        case 40:
          change_snake_direction('d');
          break;
      }
    };
    if(game_go==true){
      move_snake();
      paint_board();
      //if(game_go==false){

      //}
      setTimeout(play_game, 100);
    }
}
/*ctx.beginPath();
ctx.rect(-10, 100, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();
*/

function choose_move(){
  var grtmp
  for(var i=0;i<40;i++){
    for(var j=0;j<40;j++){
      if(i==0 || i==39||j==0||j==39){
        grtmp[i][j] = 'wall';
      }
      else{
        grtmp[i][j] = null;
      }
    }
  }
  for(var i=0;i<snake.length;i++){
    grtmp[snake[i][0]][snake[i][1]] = 'snake';
  }
  grtmp[x_apple][y_apple] = 'apple';
}

