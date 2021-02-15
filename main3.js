
var cols = Math.floor((window.innerWidth-350)/25);;
var rows =  Math.floor((window.innerHeight-125)/25);;
var startX = 0;
var startY = 0;
var endY = rows-1;
var endX = cols -1;
var openSet = [];
var mouseStatus = 1;
var status = 0;
var nodeH = 25;
var nodeW = 25;
var grid = new Array(cols);
var currentNode;
var generate = 0;


function findMin(x){
    var minF = [];
    var minH = [];
    var minf = Infinity;
    var minh = Infinity;
    var ming = Infinity;
    var minimum = new node(0,0);
    for(var i = 0; i <x.length;i++){
        if(x[i].f < minf){
            minf = x[i].f;
            minF = [];
            minF.push(x[i]);
        }else if(x[i].f == minf){
            minF.push(x[i]);
        }
    }
    for(i = 0; i <minF.length;i++){
        if(minF[i].h < minh){
            minh = minF[i].h;
            minH = [];
            minH.push(minF[i]);
        }else if(minF[i].h == minh){
            minH.push(minF[i]);
        }
    }
    for(i = 0; i <minH.length;i++){
        if(minH[i].g < ming){
            ming = minH[i].g;
            minimum = minH[i];
        }
    }
    return minimum;
}
function node(i,j){
    this.x =i;
    this.y =j;
    //0: open
    //1: blocked
    //2: start
    //3: end
    //4: closed
    //5: opened
    //6: path
    this.prev = null;
    this.tag = 0;
    //distance from start
    this.g = Infinity;
    this.g2 = 0;
    //distance from end
    this.h = 0;
    
    this.f = Infinity;
    this.neighbors = [];
    this.show = function(){
        if(this.tag == 1){
            fill(0)
        }else if(this.tag == 2){
            fill(0,128,0);
        }else if(this.tag == 3){
            fill(255,0,0);
        }else if(this.tag == 4){
            fill(255,255,0);
        }else if(this.tag == 5){
            fill(255,165,0);
        }else if(this.tag == 6){
            fill(0,255,255);
        }else{
            fill(255);
        }

        stroke(0);
        rect(this.x*nodeW,this.y*nodeH,nodeW-1,nodeH-1);
    }
    

}

function setup(){
    createCanvas(Math.floor((window.innerWidth-350)/25)*25,Math.floor((window.innerHeight-125)/25)*25);

    
    //create grid
    for(var i = 0; i < cols; i++){
        grid[i] = new Array(rows);
    }
    //assigns each element of grid a node
    for(i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j] = new node(i,j);
        }
    }
    grid[startX][startY].tag= 2;
    grid[startX][startY].g = 0;
    grid[startX][startY].f = dist(startX,startY,endX,endY);
    openSet.push(grid[startX][startY]);

    grid[endX][endY].tag= 3;
    console.log('A*');
    



}


function draw(){
    
    background(0);
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].show();
        }
    }

    if(status == 1){
        if(openSet.length > 0){
            //find currentNode from openSet
            
            currentNode = findMin(openSet);
            var currentX = currentNode.x;
            var currentY = currentNode.y

            //remove currentNode from openSet
            for(var i = openSet.length-1; i >=0 ; i--){
                if(currentNode == openSet[i]){
                    openSet.splice(i,1);
                    currentNode.tag = 4;
                }
            }   
            //if goal is found
            if(currentNode == grid[endX][endY]){
                
                currentNode = currentNode.prev;
                currentNode.tag = 6;
                while(currentNode.prev != null){
                    
                    for(var i = 0; i < currentNode.neighbors.length; i++){
                        
                        if(currentNode.neighbors[i].g2 < currentNode.prev.g2 && (currentNode.neighbors[i].tag == 4 || currentNode.neighbors[i].tag == 5)){
                            console.log("t1");
                            currentNode.prev = currentNode.neighbors[i];
                        }
                    }
                    
                    currentNode = currentNode.prev;
                    currentNode.tag = 6;
                }

                grid[startX][startY].tag =6;
                grid[endX][endY].tag =6;
                openSet = [];
                status = 2;
                
            }else{
            var children = [];
            var positions = [[1,0],[0,1],[0,-1],[-1,0]];
            var Dpositions = [[1,-1],[1,1],[-1,-1],[-1,1]]
            //var positions = [[1,0],[1,-1],[1,1],[0,1],[0,-1],[-1,0],[-1,-1],[-1,1]];
            //generate children
            for(var i =0; i < positions.length;i++){
                var newX = currentX + positions[i][0];
                var newY = currentY + positions[i][1];
                if(0<=newX && newX<cols){
                    if(0<=newY && newY<rows){
                        if(grid[newX][newY].tag != 1){
                            children.push(grid[newX][newY]);
                            //grid[newX][newY].tag = 5;
                            //grid[newX][newY].g = currentNode.g + 1;
                            currentNode.neighbors.push(grid[newX][newY]);
                        }
                    }
                }
            }
            for(var i =0; i < Dpositions.length;i++){
                var newX = currentX + Dpositions[i][0];
                var newY = currentY + Dpositions[i][1];
                if(0<=newX && newX<cols){
                    if(0<=newY && newY<rows){
                        if(grid[newX][newY].tag != 1){
                            children.push(grid[newX][newY]);
                            //grid[newX][newY].tag = 5;
                            //grid[newX][newY].g = currentNode.g + Math.sqrt(2);
                            currentNode.neighbors.push(grid[newX][newY]);
                        }
                    }
                }
            }
            for(var i = 0; i < children.length;i++){
                var child = children[i];
                if(child.tag == 4 ){
                    continue;
                }
                if(child.tag == 5){
                    if(child.g2 <=(currentNode.g2+dist(child.x,child.y,currentX,currentY))){
                        
                        continue;
                    }else{
                        for(var j = openSet.length-1; j >=0 ; j--){
                            if(child == openSet[j]){
                                
                                openSet.splice(j,1);
                            }
                        }
                    }
                }
                child.tag = 5;
                child.g= currentNode.g + 1;
                child.g2 = (currentNode.g2+dist(child.x,child.y,currentX,currentY));
                child.h = dist(child.x,child.y,endX,endY);

                child.f = child.g + child.h;
                child.prev = currentNode;
                openSet.push(child);
                

            }
        }
        }
    }
    if(status == 2){
        
        return;
    }
    

}
function reset(){
    setup();
}
function start(){
    status = 1;

}
function pause(){
    status = 3;
}
function GenerateObstacle(){
    if(status != 1 && status != 3){
        setup();
        for( i = 0; i < cols; i ++){
            for( j = 0; j < rows; j++)
            {
                if(!(i == startX && j == startY) && !(i == endX && j == endY)){
                    if(random(1)<.4){
                        grid[i][j].tag = 1;
                    }else{
                        grid[i][j].tag = 0;
                    }
                }
            }
        }
    }
}

function mouseDragged(){
    
    var clickedX = Math.floor(mouseX/nodeW);
    var clickedY = Math.floor(mouseY/nodeH);

    if(clickedX >= 0 && clickedX < cols && clickedY >= 0 && clickedY < rows){
        if(mouseStatus == 1){
            if(grid[clickedX][clickedY].tag == 0){
                grid[clickedX][clickedY].tag = 1;
            }
        }
        if(mouseStatus == 2){
            grid[startX][startY].tag= 0;

            grid[clickedX][clickedY].tag = 2;
            startX = clickedX;
            startY = clickedY;

        }
        
    }

}
