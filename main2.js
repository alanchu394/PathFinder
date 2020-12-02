
var cols = 50;
var rows =  25;
var startX = 0;
var startY = 0;
var endY = 0;
var endX = cols -1;
var distX = Math.abs(endX - startX);
var distY = Math.abs(endY - startY);
var openSet = [];
var mouseStatus = 1;
var status = 0;
var nodeH;
var nodeW;
var grid = new Array(cols);
function findMin2(x){
    var min = Infinity;
    var minimum = new node(0,0);
    for(var i = 0; i < x.length;i++){
        if(x[i].f<min){
            minimum  = x[i];
            min = x[i].f;
        }
    }
    return minimum;
}
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
    //distance from end
    this.h = 0;
    
    this.f = Infinity;

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

    grid[endX][endY].tag= 3;


    console.log('A*');



}
function start(){
    status = 1;

}
function pause(){
    status = 0;
}


function setObstacle(){
    mouseStatus = 1;
}

var currentX = startX;
var currentY = startY;
var currentNode = new node(startX,startY);
openSet.push(currentNode);
currentNode.tag = 4;
currentNode.g = 0;
currentNode.h = dist(startX,startY,endX,endY);
currentNode.f = currentNode.h +currentNode.g;
function mouseDragged(){
    nodeW = width/cols;
    nodeH = height/rows;
    var clickedX = Math.floor(mouseX/nodeW);
    var clickedY = Math.floor(mouseY/nodeH);

    if(clickedX >= 0 && clickedX < cols && clickedY >= 0 && clickedY < cols){
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
        //remove current node from openSet
        for(var i = openSet.length-1; i >=0 ; i--){
            if(currentNode == openSet[i]){
                openSet.splice(i,1);

            }
        }
        //add neighbors of current
        if(currentX+1 < cols){
            if(grid[currentX+1][currentY].tag != 1 && grid[currentX+1][currentY].tag != 4){
                grid[currentX+1][currentY].g = currentNode.g + 1;
                grid[currentX+1][currentY].h = (dist(currentX+1,currentY,endX,endY));
                grid[currentX+1][currentY].f = grid[currentX+1][currentY].g + grid[currentX+1][currentY].h;
                if(grid[currentX+1][currentY].tag != 5){
                    openSet.push(grid[currentX+1][currentY]);
                    grid[currentX+1][currentY].tag = 5;
                    grid[currentX+1][currentY].prev = currentNode;
                }
                
                
                
            }
            
        }
        if(currentX+1 < cols && currentY+1 < rows){
            console.log("test");
            if(grid[currentX+1][currentY+1].tag != 1 && grid[currentX+1][currentY+1].tag != 4){
                grid[currentX+1][currentY+1].g = currentNode.g + 1;
                grid[currentX+1][currentY+1].h = (dist(currentX+1,currentY+1,endX,endY));
                grid[currentX+1][currentY+1].f = grid[currentX+1][currentY+1].g + grid[currentX+1][currentY+1].h;
                if(grid[currentX+1][currentY+1].tag != 5){
                    openSet.push(grid[currentX+1][currentY+1]);
                    grid[currentX+1][currentY+1].tag = 5;
                    grid[currentX+1][currentY+1].prev = currentNode;
                }
                
                
                
            }
            
        }
        if(currentY+1 < rows){
            if(grid[currentX][currentY+1].tag != 1 && grid[currentX][currentY+1].tag != 4){
                grid[currentX][currentY+1].h = (dist(currentX,currentY+1,endX,endY));
                grid[currentX][currentY+1].g = currentNode.g + 1;
                grid[currentX][currentY+1].f = grid[currentX][currentY+1].g + grid[currentX][currentY+1].h;
                if(grid[currentX][currentY+1].tag != 5){
                    openSet.push(grid[currentX][currentY+1]);
                    grid[currentX][currentY+1].tag = 5;
                    grid[currentX][currentY+1].prev = currentNode;
                }
                
                
                
            }
            
        }
        if(currentX-1 >=0 && currentY+1 < rows){
            if(grid[currentX-1][currentY+1].tag != 1 && grid[currentX-1][currentY+1].tag != 4){
                grid[currentX-1][currentY+1].h = (dist(currentX-1,currentY+1,endX,endY));
                grid[currentX-1][currentY+1].g = currentNode.g + 1;
                grid[currentX-1][currentY+1].f = grid[currentX-1][currentY+1].g + grid[currentX-1][currentY+1].h;
                if(grid[currentX-1][currentY+1].tag != 5){
                    openSet.push(grid[currentX-1][currentY+1]);
                    grid[currentX-1][currentY+1].tag = 5;
                    grid[currentX-1][currentY+1].prev = currentNode;
                }
                
                
                
            }
            
        }
        if(currentX-1 >=0){
            if(grid[currentX-1][currentY].tag != 1 && grid[currentX-1][currentY].tag != 4){
                grid[currentX-1][currentY].h = (dist(currentX-1,currentY,endX,endY));
                grid[currentX-1][currentY].g = currentNode.g + 1;
                grid[currentX-1][currentY].f = grid[currentX-1][currentY].g + grid[currentX-1][currentY].h;
                if(grid[currentX-1][currentY].tag != 5){
                    openSet.push(grid[currentX-1][currentY]);
                    grid[currentX-1][currentY].tag = 5;
                    grid[currentX-1][currentY].prev = currentNode;
                }
                
                
                
            }
            
        }
        if(currentY-1 >= 0 && currentX-1 >=0){
            if(grid[currentX-1][currentY-1].tag != 1 && grid[currentX=1][currentY-1].tag != 4){
                grid[currentX-1][currentY-1].h = (dist(currentX-1,currentY-1,endX,endY));
                grid[currentX-1][currentY-1].g = currentNode.g + 1;
                grid[currentX-1][currentY-1].f = grid[currentX-1][currentY-1].g + grid[currentX-1][currentY-1].h;
                if(grid[currentX-1][currentY-1].tag != 5){
                    openSet.push(grid[currentX-1][currentY-1]);
                    grid[currentX-1][currentY-1].tag = 5;
                    grid[currentX-1][currentY-1].prev = currentNode;
                }
                
                
                
            }
            
        }
        if(currentY-1 >= 0){
            if(grid[currentX][currentY-1].tag != 1 && grid[currentX][currentY-1].tag != 4){
                grid[currentX][currentY-1].h = (dist(currentX,currentY-1,endX,endY));
                grid[currentX][currentY-1].g = currentNode.g + 1;
                grid[currentX][currentY-1].f = grid[currentX][currentY-1].g + grid[currentX][currentY-1].h;
                if(grid[currentX][currentY-1].tag != 5){
                    openSet.push(grid[currentX][currentY-1]);
                    grid[currentX][currentY-1].tag = 5;
                    grid[currentX][currentY-1].prev = currentNode;
                }
                
                
                
            }
            
        }
        if(currentY-1 >= 0 && currentX+1 < cols){
            if(grid[currentX+1][currentY-1].tag != 1 && grid[currentX+1][currentY-1].tag != 4){
                grid[currentX+1][currentY-1].h = (dist(currentX+1,currentY-1,endX,endY));
                grid[currentX+1][currentY-1].g = currentNode.g + 1;
                grid[currentX+1][currentY-1].f = grid[currentX+1][currentY-1].g + grid[currentX+1][currentY-1].h;
                if(grid[currentX+1][currentY-1].tag != 5){
                    openSet.push(grid[currentX+1][currentY-1]);
                    grid[currentX+1][currentY-1].tag = 5;
                    grid[currentX+1][currentY-1].prev = currentNode;
                }
                
                
                
            }
            
        }
        }   
        
        currentNode = findMin(openSet);
        console.log(findMin2(openSet).h);
        currentX = currentNode.x;
        currentY = currentNode.y;




        }
    }

}
