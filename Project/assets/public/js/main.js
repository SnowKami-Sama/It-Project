let burger = document.querySelector("#Burger").addEventListener("click",toggle);

let menu = document.querySelector("#Menu ul");

var Menu = {
  
  el: {
    ham: document.querySelector('.menu'),
    menuTop: document.querySelector('.menu-top'),
    menuMiddle: document.querySelector('.menu-middle'),
    menuBottom: document.querySelector('.menu-bottom')
  },
  
  init: function() {
    Menu.bindUIactions();
  },
  
  bindUIactions: function() {
    Menu.el.ham
        .addEventListener(
          'click',
        function(event) {
        Menu.activateMenu(event);
        event.preventDefault();
      }
    );
  },
  
  activateMenu: function() {
    Menu.el.menuTop.classList.toggle('menu-top-click');
    Menu.el.menuMiddle.classList.toggle('menu-middle-click');
    Menu.el.menuBottom.classList.toggle('menu-bottom-click'); 
  }
};

Menu.init();
// MENU TOGGLE

function toggle(){
    if(menu.classList.contains("display")){
        menu.classList.add("exitdisplay");
        menu.classList.remove("display");
        document.body.style.overflow = "scroll";
        
        setTimeout(function(){ menu.classList.remove("exitdisplay"); }, 500);
        
        
    }
    else{
        menu.classList.remove("exitdisplay");
        menu.classList.add("display");
        document.body.style.overflow = "hidden";
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
