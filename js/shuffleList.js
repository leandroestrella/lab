/* if (window.innerWidth <= 600) { */
  var ul = document.querySelector(".container");
  for (var i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[(Math.random() * i) | 0]);
  }
/* } */
