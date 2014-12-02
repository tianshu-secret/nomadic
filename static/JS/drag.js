function dropIt(target, e) {
    var id = e.dataTransfer.getData('DragDiv');
    target.appendChild(document.getElementById(id)); 
    target.style.border="0px";
    target.style.background="";
    e.preventDefault();
    if(id.substring(0,3)=="xin"){
        window.sessionStorage.setItem(myidArray0[id.charAt(id.length-1)], target.id);
    }
    else {
        window.sessionStorage.setItem(myidArray1[id.charAt(id.length-1)], target.id);
    }
}

function enterIt(target,e) {
    target.style.border="1px dotted #999";
    target.style.background="#cde6c7";
    e.preventDefault();
}

function leaveIt(target,e) {
    target.style.border="0px";
    target.style.background="";
    e.preventDefault();
}

function trashIt(target, e) {
    var id = e.dataTransfer.getData('DragDiv');
    removeElement(id);
    e.preventDefault();   
    if(id.substring(0,3)=="xin"){
        window.sessionStorage.setItem(myidArray0[id.charAt(id.length-1)], "trash");
    }
    else {
        window.sessionStorage.setItem(myidArray1[id.charAt(id.length-1)], "trash");
    }
}

function removeElement(id)	{
    var d_node = document.getElementById(id);
    d_node.parentNode.removeChild(d_node);
}
