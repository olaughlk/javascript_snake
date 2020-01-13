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

var game_mode = 'a';

/*
Adding button to restart game
var btn = document.createElement("BUTTON");   // Create a <button> element
btn.innerHTML = "CLICK ME";                   // Insert text
document.body.appendChild(btn);
*/

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
  grid[15][15] = 'wall';
  grid[15][16] = 'wall';
  grid[16][15] = 'wall';
  grid[16][16] = 'wall';
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
	traversed_blocks = [];
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
  	var button_press = true;
	var time = 0;

	if(game_mode=='a'){
		time = 1;
		var a = choose_move();
		switch (a){
		  case 37:
			change_snake_direction('l');
			button_press = false;
			break;
		  case 38:
			change_snake_direction('u');
			button_press = false;
			break;
		  case 39:
			change_snake_direction('r');
			button_press = false;
			break;
		  case 40:
			change_snake_direction('d');
			button_press = false;
			break;
		}
	}
	else if(game_mode=='b'){
		time = 50;
	   document.onkeydown = function(event){
		  if(button_press){
		      var a = event.keyCode;
		      switch (a){
		        case 37:
		          change_snake_direction('l');
				  button_press = false;
		          break;
		        case 38:
		          change_snake_direction('u');
				  button_press = false;
		          break;
		        case 39:
		          change_snake_direction('r');
				  button_press = false;
		          break;
		        case 40:
		          change_snake_direction('d');
				  button_press = false;
		          break;
		      }
		  }
	  	}
	}
	//change_snake_direction(choose_move());
	move_snake();
    if(game_go==true){
      paint_board();
      //if(game_go==false){

      //}
      setTimeout(play_game, time);
    }
}
/*ctx.beginPath();
ctx.rect(-10, 100, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();
*/
var traversed_blocks = [];
function choose_move(){
  var new_move = snake[0].slice();
  var dLen = 0;
  var uLen = 0;
  var rLen = 0;
  var lLen = 0;
  var rtn = 1;
  var rtn_weight = 0;
  var found_move = false;

  var dgood = true;

  for(var i = snake[0][1]+1;i<40;i++){
	  if(grid[snake[0][0]][i] == 'snake'||i==39){//||grid[snake[0][0]][i] == 'wall'
		  if(i!=39){dgood = false;}
		  dLen = i - (snake[0][1]+1);
		  break;
	  }
	  if(grid[snake[0][0]][i] == 'apple'){return 40;}
  }
  if(dgood&&apple_pos[1]>snake[0][1]){return 40;}

  var ugood = true;
  for(var i = snake[0][1]-1;i>=0;i--){
	  if(grid[snake[0][0]][i] == 'snake'||i==0){//||grid[snake[0][0]][i] == 'wall'
		  if(i!=0){ugood = false;}
		  uLen = (snake[0][1]-1) - i;
		  break;
	  }
	  if(grid[snake[0][0]][i] == 'apple'){return 38;}
  }
  if(ugood&&apple_pos[1]<snake[0][1]){return 38;}

  var rgood = true;
  for(var i = snake[0][0]+1;i<40;i++){
	  if(grid[i][snake[0][1]] == 'snake'||i==39){//||grid[i][snake[0][1]] == 'wall'
		  if(i!=39){rgood = false;}
		  rLen = i - (snake[0][0]+1);
		  break;
	  }
	  if(grid[i][snake[0][1]] == 'apple'){return 39;}
  }
  if(rgood&&apple_pos[0]>snake[0][0]){return 39;}

  var lgood = true;
  for(var i = snake[0][0]-1;i>=0;i--){
	  if(grid[i][snake[0][1]] == 'snake'||i==0){//||grid[i][snake[0][1]] == 'wall'
		  if(i!=0){lgood = false;}
		  lLen = (snake[0][0]-1) - i;
		  break;
	  }
	  if(grid[i][snake[0][1]] == 'apple'){return 37;}
  }
  if(lgood&&apple_pos[0]<snake[0][0]){return 37;}

  console.log(dLen);
  console.log(uLen);
  console.log(rLen);
  console.log(lLen);

  if(dLen>rtn_weight&&!creates_sub_group([snake[0][0],snake[0][1]+1])){
	  rtn = 40;
	  rtn_weight = dLen;
	  //chosen_group = get_sub_group([snake[0][0],snake[0][1]+1]);
  }
  if(uLen>rtn_weight&&!creates_sub_group([snake[0][0],snake[0][1]-1])){
	  rtn = 38;
	  rtn_weight = uLen;
	  found_move = true;
	  //chosen_group = get_sub_group([snake[0][0],snake[0][1]-1]);
  }
  if(rLen>rtn_weight&&!creates_sub_group([snake[0][0]+1,snake[0][1]])){
	  rtn = 39;
	  rtn_weight = rLen;
	  found_move = true;
	  //chosen_group = get_sub_group([snake[0][0]+1,snake[0][1]]);
  }
  if(lLen>rtn_weight&&!creates_sub_group([snake[0][0]-1,snake[0][1]])){
	  rtn = 37;
	  rtn_weight = lLen;
	  found_move = true;
	  //chosen_group = get_sub_group([snake[0][0]-1,snake[0][1]]);
  }

  /*var sub_g = get_sub_group([snake[0].slice(0)]);
  var has_apple = false;
  for(var i=0;i<sub_g.length;i++){
	  if(graph[i[0]][i[1]] == 'apple'){
		  has_apple = true;
		  break;
	  }
  }*/
  /*if(!found_move){
	  console.log("new move");
	  var illegal = true;
	  while(illegal){
	  	var moves = [37, 38, 39, 40];
	  	rtn = moves[Math.floor(Math.random()*4)];
		if(is_good_move(rtn)){illegal = false;}
	  }
  }*/


  if(is_good_move(rtn)){return rtn;}
  /*else{
	  while(true){
	  	var moves = [37, 38, 39, 40];
	  	var cho = moves[Math.floor(Math.random()*4)];
		if(is_good_move(rtn)){return cho;}
	  }
  }*/
}

function creates_sub_group(group){

	return false;
}

function get_sub_group(group){
	var block = group.slice(0);
	var build = true;
	//while(build){
	//	build = false;
		for(var i = 0;i<block.length;i++){
			if(block[0][1]>0&&(grid[block[0][0]][block[0][1]-1]==null||grid[block[0][0]][block[0][1]-1]=='apple')){
				block.unshift([block[0][0],block[0][1]-1]);
				get_sub_group(block);
	//			build = true;
			}
			if(block[0][0]>0&&(grid[block[0][0]-1][block[0][0]]==null||grid[block[0][0]-1][block[0][0]]=='apple')){
				block.unshift([block[0][0]-1,block[0][0]]);
				get_sub_group(block);
	//			build = true;
			}
			if(block[0][1]<39&&(grid[block[0][0]][block[0][1]+1]==null||grid[block[0][0]][block[0][1]+1]=='apple')){
				block.unshift([block[0][0],block[0][1]+1]);
				get_sub_group(block);
	//			build = true;
			}
			if(block[0][0]<39&&(grid[block[0][0]+1][block[0][0]]==null||grid[block[0][0]+1][block[0][0]]=='apple')){
				block.unshift([block[0][0]+1,block[0][0]]);
				get_sub_group(block);
	//			build = true;
			}
		}
	//}
	return block;

}

function fail_safe(){

}

function is_good_move(move){
	if(move == 38&&(grid[snake[0][0]][snake[0][1]-1]=='snake'||grid[snake[0][0]][snake[0][1]-1])=='wall'){
		return false;
	}
	if(move == 40&&(grid[snake[0][0]][snake[0][1]+1]=='snake'||grid[snake[0][0]][snake[0][1]+1])=='wall'){
		return false;
	}
	if(move == 37&&(grid[snake[0][0]-1][snake[0][1]]=='snake'||grid[snake[0][0]-1][snake[0][1]])=='wall'){
		return false;
	}
	if(move == 39&&(grid[snake[0][0]+1][snake[0][1]]=='snake'||grid[snake[0][0]+1][snake[0][1]])=='wall'){
		return false;
	}
	return true;
}
/*
function has_neighbor(block){
	if((block[0][1]>0&&(grid[block[0][0]][block[0][1]-1]=='snake'||grid[block[0][0]][block[0][1]-1]=='wall')||
	  ((block[0][0]>0&&(grid[block[0][0]][block[0][0]-1]=='snake'||grid[block[0][0]][block[0][0]-1]=='wall')||
	  ((block[0][1]<39&&(grid[block[0][0]][block[0][1]+1]=='snake'||grid[block[0][0]][block[0][1]+1]=='wall')||
  	  ((block[0][0]<39&&(grid[block[0][0]][block[0][0]+1]=='snake'||grid[block[0][0]][block[0][0]+1]=='wall')){
		  return false;
	  }
	  return true;
}
*/
