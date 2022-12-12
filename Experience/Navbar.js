import EventEmitter from "events";

export default class Navbar extends EventEmitter{
  constructor() {
    super();

    this.navbar = document.querySelectorAll(".navbaritem")
    
    this.setEventListeners();
  }


  setEventListeners() {
    document.querySelectorAll(".navbarlink").forEach(a => {
      a.addEventListener("click", function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
        .scrollIntoView({
          behavior: "smooth",
        });
      });
    });
    
//     // Close the dropdown if the user clicks outside of it
//     window.onclick = function(event) {
//       if (!event.target.matches('.dropbtn')) {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         var i;
//         for (i = 0; i < dropdowns.length; i++) {
//           var openDropdown = dropdowns[i];
//           if (openDropdown.classList.contains('show')) {
//             openDropdown.classList.remove('show');
//           }
//         }
//       }
//     }
  };
}
