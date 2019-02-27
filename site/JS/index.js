$(document).ready(function(){
  changePage("INC_Acceuil");
  $('li').click(function(){
    selected(this.id);
    changePage(this.id);
  });

  function selected(elem){
    $('li').css('background-color', '#89C35C');
    $('#' + elem).css('background-color', '#348017');
  }

  function changePage(elem){
    $('#main').load("./INC/" + elem);
  }
});
