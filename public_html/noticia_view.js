$(document).ready(function(){
    // Inicializa a página
        loadText()

    // Métodos
      async function getText(){
        let slug = window.location.pathname.split('/').slice(-1);   
        let r = await $.ajax({
            url:"/api/noticia/"+slug,
            type: "GET",
            dataType: "json"
        })
        return r.data[0]
      }
      async function loadText(){
          let data = await getText();
          console.log()
          $("#news-title").html(data.title)
          $("#news-sum").html(data.summary)
          for (let p of data.content.split("<br />")){
              $("#news-content").append(`<p style="text-indent: 2em; text-align: justify !important;">${p}</p>`)
          }
          $("#news-img").attr('src',`http://${window.location.host}/api/imagem/${data.img_path}`)
      }
})

