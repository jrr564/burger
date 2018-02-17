$(function () {
  $('.create-form').submit(function (event) {
    event.preventDefault()
    data = $('#newBurger').val().trim()
    if(data.length === 0) {
      return alert("Please enter a burger's name")
    } else if (data.length > 50) {
      return alert("The name is too long!")
    }
    $.ajax({
      url: '/api/burgers',
      method: 'POST',
      data: { name: data, devoured: false }
    }).done(function (data) {
      console.log('Data loaded: ' + data)
      location.reload()
    })
  })

  $('.update').click(function () {
    id = $(this).data('id')
    $.ajax({
      url: '/api/burgers/' + id,
      method: 'PUT',
      data: { devoured: true }
    }).done(function () {
      location.reload()
    })
  })

  $('.delete').click(function () {
    id = $(this).data('id')
    $.ajax({
      url: '/api/burgers/' + id,
      method: 'DELETE'
    }).done(function () {
      location.reload()
    })
  })
})