
$(document).ready(function () {
 
});

var usuario = function () {

    //Ids dos elementos da tela
    var controles = function () {
        return {
            email: "#email_user",
            senha: "#password_user",
            nome_profs:"#nome_profs",
            email_profs:"#email_profs",
            senha_profs:"#senha_profs"    
        };
    }

    var logar = function (){

      // var url = "http://localhost:9090/api/usuario/authenticate";
      var url = "https://librando.azurewebsites.net/api/usuario/authenticate";
      var usuario ={}
      usuario.email = $(controles().email).val();
      usuario.senha = $(controles().senha).val();
    
      $.ajax({
        type: "POST",
        url: url,
        data: usuario,
        cache: false        
      })
      .done(function (data) {
        console.log(data);
        
      }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(errorThrown);
      });

    }

    var cadastrar = function (){

      // var url = "http://localhost:9090/api/usuario/register";
      var url = "https://librando.azurewebsites.net/api/usuario/register";
      var usuario ={}
      usuario.nome = $(controles().nome_profs).val()
      usuario.login = $(controles().email_profs).val();
      usuario.senha = $(controles().senha_profs).val();
    
      $.ajax({
        type: "POST",
        url: url,
        data: usuario,
        cache: false        
      })
      .done(function (data) {
        console.log(data);
        
      }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(errorThrown);
      });


    }


    return {
      logar: logar,
      cadastrar: cadastrar
       
    };
}();