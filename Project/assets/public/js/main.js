let burger = document.querySelector("#Burger").addEventListener("click",toggle);

let menu = document.querySelector("#Menu ul");

// MENU TOGGLE

function toggle(){
    if(menu.classList.contains("display")){
        menu.classList.add("exitdisplay");
        menu.classList.remove("display");
        setTimeout(function(){ menu.classList.remove("exitdisplay"); }, 500);
        
    }
    else{
        menu.classList.remove("exitdisplay");
        menu.classList.add("display");
    }

}

// COPYRIGHT FUNCTIE

function copyRight(owner)
  {
    var nu = new Date();
    copyright_string = "&copy;" + nu.getFullYear() + " "+owner;		 
    return(copyright_string);
  }
  let footer = document.querySelector("footer");
  footer.innerHTML = (copyRight("Fried Pickles | IT-Project | Lord of The Strings"));


let btns = menu.getElementsByClassName("link");

// Loop through the buttons and add the active class to the current/clicked button
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace("active", "");
    this.className += " active";
  });
}