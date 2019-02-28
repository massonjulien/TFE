$(document).ready(function(){
  selected("INC_Acceuil");
  changePage("INC_Acceuil");
  $('a').click(function(){
    selected(this.id);
    changePage(this.id);
  });

  $(document).on("click", "a", function(event) {
          event.preventDefault();
           var dataUrl = $(this).attr("href");
           if (dataUrl != "") {

            //changePage(dataUrl);
           }

       });

  function selected(elem){
    $('a').css('background-color', '#333');
    $('#' + elem).css('background-color', '#348017');
  }

  function changePage(elem){
    $('#main').load("./INC/" + elem);
  }
});

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
