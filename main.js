
var cols = 50;
var rows =  25;
var startX = 0;
var startY = 0;
var endY = rows-1;
var endX = cols -1;
var distX = Math.abs(endX - startX);
var distY = Math.abs(endY - startY);
var openSet = [];
var closedSet = [];
var status = 0;
var nodeH;
var nodeW;
var grid = new Array(cols);
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
    this.g = 0;
    //distance from end
    this.h = Math.sqrt(((endX - this.x)**2) + (endY - this.y)**2);
    
    this.f = this.h + this.g;
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
    createCanvas(600,300);
    nodeW = width/cols;
    nodeH = height/rows;
    //create gridz
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
    grid[endX][endY].tag= 3;
    for(i = 0; i < grid[5].length-10;i++){
        grid[5][i].tag = 1;
    }
    for(i = grid[25].length-1; i >5;i--){
        grid[25][i].tag = 1;
    }

    console.log('A*');



}
function start(){
    status = 1;

}
function pause(){
    status = 0;
}
var currentX = startX;
var currentY = startY;
var currentNode = new node(startX,startY);
openSet.push(currentNode);
currentNode.tag = 4;
function draw(){
    
    background(0);
    for(var i = 0; i < cols; i++){
        for(var j = 0; j < rows; j++){
            grid[i][j].show();
        }
    }
    //AStar Algorthim
    if(status == 1){
        if(openSet.length > 0){
        
        if(currentNode == grid[endX][endY]){
            while(currentNode.prev != null){
                currentNode.tag = 6;
                currentNode = currentNode.prev;
            }
            grid[startX][startY].tag =6;
            grid[endX][endY].tag =6;
            openSet = [];
        }else{
        currentNode.tag = 4;
        //remove current node from openSet and move to closedSet
        for(var i = openSet.length-1; i >=0 ; i--){
            if(currentNode == openSet[i]){
                openSet.splice(i,1);
                closedSet.push(currentNode);
            }
        }
        //add neighbors of current
        if(currentX+1 < cols){
            if(grid[currentX+1][currentY].tag != 1 && grid[currentX+1][currentY].tag != 4){
                if(grid[currentX+1][currentY].tag != 5){
                    openSet.push(grid[currentX+1][currentY]);
                    grid[currentX+1][currentY].tag = 5;
                }
                
                grid[currentX+1][currentY]. prev = currentNode;
                grid[currentX+1][currentY].g = currentNode.g + 1;
            }
            
        }
        if(currentY+1 < rows){
            if(grid[currentX][currentY+1].tag != 1 && grid[currentX][currentY+1].tag != 4){
                if(grid[currentX][currentY+1].tag != 5){
                    openSet.push(grid[currentX][currentY+1]);
                    grid[currentX][currentY+1].tag = 5;
                }
                
                grid[currentX][currentY+1].prev = currentNode;
                grid[currentX][currentY+1].g = currentNode.g + 1;
            }
            
        }
        if(currentX-1 >=0){
            if(grid[currentX-1][currentY].tag != 1 && grid[currentX-1][currentY].tag != 4){
                if(grid[currentX-1][currentY].tag != 5){
                    openSet.push(grid[currentX-1][currentY]);
                    grid[currentX-1][currentY].tag = 5;
                }
                
                grid[currentX-1][currentY].prev = currentNode;
                grid[currentX-1][currentY].g = currentNode.g + 1;
            }
            
        }
        if(currentY-1 >= 0){
            if(grid[currentX][currentY-1].tag != 1 && grid[currentX][currentY-1].tag != 4){
                if(grid[currentX][currentY-1].tag != 5){
                    openSet.push(grid[currentX][currentY-1]);
                    grid[currentX][currentY-1].tag = 5;
                }
                
                grid[currentX][currentY-1].prev = currentNode;
                grid[currentX][currentY-1].g = currentNode.g + 1;
            }
            
        }
        }   
        
        currentNode = findMin(openSet);

        currentX = currentNode.x;
        currentY = currentNode.y;




        }
    }

}
