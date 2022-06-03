// AJAX CALLS
$('[id^=changeReason]').each(function() {
  $('[id^=changeReason] [id^=changeReasonButton]').on("submit", function(e){
    e.preventDefault();
    var data = {
      id: $(this).find('[id^=idToChange]').val(),
      reason: $(this).find('[id^=textcontent]').val(),
    }
    $.ajax({
      url: '/changeReason',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(response) {
      }
    });
  });
});

    const edits = document.querySelectorAll(".reasonEdit");
    var modals = document.querySelectorAll(".modalEdit");
    var spans = document.querySelectorAll(".close");
    for (let i = 0; i < edits.length; i++) {
      const element = edits[i];
        element.onclick = function() {
          modals.forEach(element => {
            element.classList.remove("displayModal");
          });
          modals[i].classList.add("displayModal");
          modals[i].classList.remove("hideModal");
        }
    
        // When the user clicks on <span> (x), close the modal
        spans[i].onclick = function() {
            modals[i].classList.add("hideModal");
        }
    
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modals[i]) {
          modals.forEach(element => {
            element.classList.remove("displayModal");
          });
        }
        }
    }
    $('#dislikeForm').on('submit',function(e) {
      var data = {
        id: $('#dislikeForm .quoteId').val(),
        content: $('#dislikeForm .content').val(),
        character: $('#dislikeForm .characterForm').val(),
        reason: $('#dislikeForm').find("#reason").val(),
      }
      e.preventDefault();
      
      $.ajax({
        url: "/dislike",
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: async function(response) {
        modal.classList.remove("displayModal");
          if(response.response.added){
              
              document.getElementById("userMessage").textContent = "Quote added";
              setTimeout(function() {
              document.getElementById("userMessage").textContent = "";
              },2000);
          }
          else{
              document.getElementById("userMessage").textContent = "Quote exists";
              setTimeout(function() {
              document.getElementById("userMessage").textContent = "";
              },2000);
          }
          counter--;
        }
      });
      
  });

$('[id^=changeReasonId]').on('click',function() {
  var $this = $(this);
  const changeReasonForm = $this.siblings('[id^=changeReasonText]');
  const changeReasonButton = $this.siblings('[id^=changeReasonButton]');
  if($(changeReasonForm).css('display') == 'none'){
    $(changeReasonForm).show();
    $(changeReasonButton).show();
  } else {
    $(changeReasonForm).hide();
    $(changeReasonButton).hide();
  }
});
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
$('[id^=deletefavForm]').on('submit',function(e) {
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