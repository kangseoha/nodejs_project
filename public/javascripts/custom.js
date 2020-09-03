$('#write').click(function () {
    $('.write').show();
  })

  function more(e){
    $.ajax({
      url: '/api/select',
      type: 'GET',
      data : {idx : e},
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function(data) {
        document.getElementById('modify').setAttribute('idx',data[0].idx);
        document.getElementById('name_read').innerHTML = data[0].name;
        document.getElementById('title_read').innerHTML = data[0].title;
        document.getElementById('content_read').innerHTML = data[0].content;


        $('.show').show();
      },
      error: function(err){
        console.log(err)
      }
    });
  }

  $('.close').click(function () {
    // 닫기는 공통
    document.getElementById('password_update').value='';
    document.getElementById('password_write').value='';
    
    $('.modal').hide();

  })

  $('#update').click(function () {
    $.ajax({
      url: '/api/select/confirm',
      type: 'POST',
      data : {
        idx : document.getElementById('modify').getAttribute('idx'), 
        password : document.getElementById('password_update').value
      },
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function(data) {
        if(data=='empty'){alert('비밀번호를 확인해주세요.')}
        else{
          document.getElementById('modi_idx').setAttribute('idx',data.idx)
          document.getElementById('name_modi').value = data.name
          document.getElementById('title_modi').value = data.title
          document.getElementById('content_modi').innerHTML = data.content
          $('.update').show();
        } 
      },
      error: function(err){
        console.log(err)
      }
    });
    
  })

  $(document).ready(function(){
    $.ajax({
      url: '/api/select',
      type: 'GET',
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function(data) {
        console.log(data)
        list(data);
      },
      error: function(err){
        console.log(err)
      }
    });
  })


  function list(datalist){
    for(var i in datalist){
      var result = Math.floor(Math.random() * 5) + 1;
        var _tr =  '<article class="item">\n'+
                    '<header>\n'+
                    '<a href=""><img src="../images/'+result+'.jpg" alt="" /></a><h3>'+datalist[i].title+'</h3>\n'+
                    '</header> <p>'+datalist[i].name+'</p>\n'+
                    '<button onclick="more('+datalist[i].idx+')">More</button>\n'+
                    '</article>';
        $('#list').append(_tr);
    }
}

$('#delete').click(function(){
  $.ajax({
    url: '/api/delete',
    type: 'DELETE',
    data : {
      password : $('#password_update').val(),
      idx : document.getElementById('modify').getAttribute('idx')
    },
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: function(data) {
      data == 'fail' ?  alert('비밀번호를 확인해주세요.') : location.reload();
    },
    error: function(err){
      console.log(err)
    }
  });
})

$('#writer').click(function(){
  $.ajax({
    url: '/api/insert',
    type: 'POST',
    data : {
      name : $('#name_writer').val(),
      title : $('#title_writer').val(),
      content : $('#content_writer').val(),
      password : $('#password_write').val()
    },
    success: function(data) {
      console.log(data)
      location.reload();
    },
    error: function(err){
      console.log(err)
    }
  });
})



$('#update_btn').click(function(){
  $.ajax({
    url: '/api/put',
    type: 'PUT',
    data : {
      idx : document.getElementById('modi_idx').getAttribute('idx'),
      name : $('#name_modi').val(),
      title : $('#title_modi').val(),
      content : $('#content_modi').val()
    },
    success: function(data) {
      // console.log(data)
      location.reload();
    },
    error: function(err){
      console.log(err)
    }
  });
})


