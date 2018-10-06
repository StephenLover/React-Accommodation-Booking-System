function show_name() {
    var value = document.getElementById("edit_input_name").style.display;
    if (value=="none") {
        document.getElementById("edit_input_name").style.display="block";
    } else {
        document.getElementById("edit_input_name").style.display="none";
    }
}

function show_phone() {
    var value = document.getElementById("edit_input_phone").style.display;
    if (value=="none") {
        document.getElementById("edit_input_phone").style.display="block";
    } else {
        document.getElementById("edit_input_phone").style.display="none";
    }
}

function show_comment() {
    var value = document.getElementById("comment_area").style.display;
    if (value=="none") {
        document.getElementById("comment_area").style.display="block";
    } else {
        document.getElementById("comment_area").style.display="none";
    }
}

window.onload=function(){
    var scope = document.getElementsByClassName("review");
    for (var id = 0; id < scope.length; id++){
        let aSpan=scope[id].getElementsByClassName("star")[0];
        let aStxt=scope[id].getElementsByClassName("star-txt")[0];
        let aBstar=aSpan.getElementsByTagName("b");
        var arrBtxt=["Bad","Poor","Normal","Good","Perfect"];
        var num=0;
        let onOff=true;for(var i= 0;i<aBstar.length;i++){
                aBstar[i].index=i;
                aBstar[i].onmouseover=function(){
                    if(onOff) {
                        num = this.index;
                        aStxt.innerHTML = arrBtxt[num];
                        for (var i = 0; i <=this.index; i++) {
                            aBstar[i].style.backgroundPosition = "0 0";
                        }
                    }
                };

                aBstar[i].onmouseout=function(){
                    if(onOff){
                        aStxt.innerHTML="";
                        for(var i=0;i<=this.index;i++){
                            aBstar[i].style.backgroundPosition="-39px 0";
                        }
                    }
                    };

                aBstar[i].onclick=function(){
                    onOff=false;

                    aStxt.innerHTML="";
                    for(var i=0;i<aBstar.length;i++){
                        aBstar[i].style.backgroundPosition="-39px 0";
                    }

                    num = this.index ;
                    aStxt.innerHTML=arrBtxt[num];
                    for(var i=0;i<=this.index;i++){
                        aBstar[i].style.backgroundPosition="0 0";

                    }

                };
            }
    }
}