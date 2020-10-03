
var r = 16;
var c = 30;
var m = 90;

var gioco = false;
var mines = new Array();
function inizializza(){
  for(var k=0;k<r;k++){
    var tr = document.createElement("tr");
    tr.title = k;
    $("#mines").append(tr);
    var td;
    for(var i=0;i<c;i++){
      td = document.createElement("td");
      td.title = i;
      $("tr[title="+k+"]").append(td);
    }
  }
  creaGioco();
}
function creaGioco(){
  for(var i=0;i<r;i++){
    mines[i] = new Array();
    for(var j=0;j<c;j++){
      mines[i][j] = 0;
      $("tr[title="+i+"] td[title="+j+"]").removeAttr("class");
      $("tr[title="+i+"] td[title="+j+"]").removeAttr("style");
    }
  }
  for(var i=0;i<m;i++){
    var x = Math.round(Math.random(10)*(c-1));
    var y = Math.round(Math.random(10)*(r-1));
    if(mines[y][x] == 0){
      mines[y][x] = 1;
    }else{
      i--;
    }
  }
  $("#smile").removeClass("smile_x");
  gioco = true;
}

function fineGioco(){
  gioco = false;
  for(var y=0;y<mines.length;y++){
    for(var x=0;x<mines[y].length;x++){
      if($("tr[title="+y+"] td[title="+x+"]").attr("class").indexOf('clicked') == -1 && $("tr[title="+y+"] td[title="+x+"]").attr("class").indexOf('flag') == -1 && mines[y][x] == 1){
        $("tr[title="+y+"] td[title="+x+"]").addClass('flower');
      }
      if($("tr[title="+y+"] td[title="+x+"]").attr("class").indexOf('flag') > -1 && mines[y][x] == 0){
        $("tr[title="+y+"] td[title="+x+"]").removeClass('flag');
        $("tr[title="+y+"] td[title="+x+"]").addClass('flag_no');
      }
    }
  }
  $("#smile").addClass("smile_x");
}

function colpetto(x,y,o){
  //alert(x);
  //alert(y);
  //alert(mines[y][x]);
  var val = mines[y][x];
  $(o).addClass("clicked");
  if(val == 1){
    $(o).addClass("flower_red");
    fineGioco();
  }else{
    $(o).addClass("empty");
    if(conta(x,y) == 0){
      libera(x,y);
    }else{
      $(o).css('background-image','url(img/'+conta(x,y)+'.png)');
      //$(o).append(conta(x,y));    
    }
  }
}

function conta(xx,yy){
  var n = 0;
  var x = parseInt(xx);
  var y = parseInt(yy);
  if(y>0){
    if(x>0){
      n += mines[y-1][x-1];
    }
    n += mines[y-1][x];
    if(x<c-1){
      n += mines[y-1][x+1];
    }
  }
  if(x>0){
    n += mines[y][x-1];
  }
  if(x<c-1){
    n += mines[y][x+1];
  }
  if(y<r-1){
    if(x>0){
      n += mines[y+1][x-1];
    }
    n += mines[y+1][x];
    if(x<c-1){
      n += mines[y+1][x+1];
    }
  }
  return n;
}

function libera(xx,yy){
  var n = 0;
  var x = parseInt(xx);
  var y = parseInt(yy);
  if(y>0){
    if(x>0){
      if($("tr[title="+(y-1)+"] td[title="+(x-1)+"]").attr("class").indexOf('clicked') == -1){
        $("tr[title="+(y-1)+"] td[title="+(x-1)+"]").click();
      }
    }
    if($("tr[title="+(y-1)+"] td[title="+(x)+"]").attr("class").indexOf('clicked') == -1){
      $("tr[title="+(y-1)+"] td[title="+(x)+"]").click();
    }
    if(x<c-1){
      if($("tr[title="+(y-1)+"] td[title="+(x+1)+"]").attr("class").indexOf('clicked') == -1){
        $("tr[title="+(y-1)+"] td[title="+(x+1)+"]").click();
      }
    }
  }
  if(x>0){
    if($("tr[title="+(y)+"] td[title="+(x-1)+"]").attr("class").indexOf('clicked') == -1){
      $("tr[title="+(y)+"] td[title="+(x-1)+"]").click();
    }
  }
  if(x<c-1){
    if($("tr[title="+(y)+"] td[title="+(x+1)+"]").attr("class").indexOf('clicked') == -1){
      $("tr[title="+(y)+"] td[title="+(x+1)+"]").click();
    }
  }
  if(y<r-1){
    if(x>0){
      if($("tr[title="+(y+1)+"] td[title="+(x-1)+"]").attr("class").indexOf('clicked') == -1){
        $("tr[title="+(y+1)+"] td[title="+(x-1)+"]").click();
      }
    }
    if($("tr[title="+(y+1)+"] td[title="+(x)+"]").attr("class").indexOf('clicked') == -1){
      $("tr[title="+(y+1)+"] td[title="+(x)+"]").click();
    }
    if(x<c-1){
      if($("tr[title="+(y+1)+"] td[title="+(x+1)+"]").attr("class").indexOf('clicked') == -1){
        $("tr[title="+(y+1)+"] td[title="+(x+1)+"]").click();
      }
    }
  }
}

$(document).ready(function(){
  
  inizializza();
  
  $("#smile").click(function (){
    creaGioco();
  });
  
  $("#smile").mousedown(function (){
    $(this).addClass('smileDown');
  });
  
  $("#smile").mouseup(function (){
    $(this).removeClass('smileDown');
  });
  
  $("#smile").mouseout(function (){
    $(this).removeClass('smileDown');
  });
  
  $("td").click(function (){
    if(!gioco) return;
    if($(this).attr("class").indexOf('flag') == -1 && $(this).attr("class").indexOf('clicked') == -1){
      var x = $(this).attr("title");
      var y = $(this).parent().attr("title");
      colpetto(x,y,$(this));
    }
    //$(this).append(colpetto(x,y));
  });
  $("td").mousedown(function (){
    if(!gioco) return;
    if($(this).attr("class").indexOf('flag') == -1 && $(this).attr("class").indexOf('clicked') == -1){
      var x = $(this).attr("title");
      var y = $(this).parent().attr("title");
      $(this).addClass("mousedown");
      $("#smile").addClass("smile_o");
    }
  });
  $("td").mouseup(function (){
    if(!gioco) return;
    if($(this).attr("class").indexOf('flag') == -1 && $(this).attr("class").indexOf('clicked') == -1){
      var x = $(this).attr("title");
      var y = $(this).parent().attr("title");
      $(this).removeClass("mousedown");
      $("#smile").removeClass("smile_o");
    }
  });
  $("td").mouseout(function (){
    if(!gioco) return;
    if($(this).attr("class").indexOf('flag') == -1 && $(this).attr("class").indexOf('clicked') == -1){
      var x = $(this).attr("title");
      var y = $(this).parent().attr("title");
      $(this).removeClass("mousedown");
      $("#smile").removeClass("smile_o");
    }
  });
  
  $("td").rightClick(function (){
    if(!gioco) return;
    var x = $(this).attr("title");
    var y = $(this).parent().attr("title");
    if($(this).attr("class").indexOf('clicked') == -1){
      if($(this).attr("class").indexOf('flag') == -1 && $(this).attr("class").indexOf('question') == -1){
        $(this).addClass("flag");
      }else if($(this).attr("class").indexOf('question') == -1){
        $(this).removeClass("flag");
        $(this).addClass("question");
      }else{
        $(this).removeClass("question");    
      }
    }
  });
  $("td").rightMouseDown(function (){
    if(!gioco) return;
    var x = $(this).attr("title");
    var y = $(this).parent().attr("title");
    $(this).removeClass("mousedown");
  });
});