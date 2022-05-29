// AJAX CALLS
$('[id^=deleteForm]').on('submit',function(e) {
  e.preventDefault();
  var data = {
    id: $(this).find('[id^=idToDelete]').val(),
  }
  $.ajax({
    url: '/delete',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function(response) {
        window.location.reload();
    }
  });
});
$('[id^=favoriteForm]').on('submit',function(e) {
  e.preventDefault();
  var data = {
    id: $(this).find('[id^=idToDelete]').val(),
  }
  $.ajax({
    url: '/deletefav',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function(response) {
        window.location.reload();
    }
  });
});
$(buttonNormal).on('click',function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr("href"),
      type: 'POST',
      contentType: 'application/json',
      success: function(response) {
        document.getElementById("list").innerHTML = response.content;
        document.getElementById("scoreTitle").innerHTML = response.title;
      }
    });
  })
  $(buttonSudden).on('click',function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr("href"),
      type: 'POST',
      contentType: 'application/json',
      success: function(response) {
        document.getElementById("list").innerHTML = response.response;
        document.getElementById("scoreTitle").innerHTML = response.titleSudden;
      }
    });
  })
  
  window.onload = function(){

    var buttonSudden = document.getElementById('buttonSudden');
    var buttonNormal = document.getElementById('buttonNormal');

    setTimeout(() => {
      buttonNormal.click();
    }, 100);

    $('input[type="Submit"]').on('click',function (e) {
      if (e.target.id == 'buttonNormal') {
        setTimeout(() => {
          buttonSudden.click();
        }, 5000);
      }
      else if(e.target.id == 'buttonSudden'){
        setTimeout(() => {
          buttonNormal.click();
        }, 5000);
      }
    });
    
};