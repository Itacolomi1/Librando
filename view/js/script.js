const url = 'http://localhost:3000/usuario'

$(document).ready(function () {
  $.get('http://localhost:3000/usuarios', function (data) {
    console.log(data)
  })

  $('#formCadastro').submit(function (event) {
    sendData()
  })
})

function sendData () {
  const nome = $('#exampleDropdownFormNome1').val()
  const password = $('#exampleDropdownFormPassword1').val()
  const login = $('#exampleDropdownFormEmail1').val()

  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      login: login,
      password: password,
      nome: nome
    }),
    dataType: 'json'
  })
}
