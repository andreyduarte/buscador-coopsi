$(document).ready(function(){
    // Inicializa a página
        updateFeed()

    // Métodos
    async function getNews(){
        let r = await $.ajax({
            url:"/api/noticias",
            type: "GET",
            dataType: "json"
        })
        return r.data
    }
    function addNew(data){
        $("#news-feed").append(`
        <div class="row gx-5">
          <div class="col-md-6 mb-4">
            <div class="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">
              <img src="http://${window.location.host}/api/imagem/${data.img_path}" class="img-fluid" />
              <a href="#!">
                <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
              </a>
            </div>
          </div>
        
          <div class="col-md-6 mb-4">
            <span class="badge bg-success px-2 py-1 shadow-1-strong mb-3">Noticia</span>
            <h4><strong>${data.title}</strong></h4>
            <p class="text-muted">
              ${data.summary}
            </p>
            <a href="http://${window.location.host}/noticias/${data.slug}">
              <button type="link" class="btn btn-success">Leia mais</button>
            </a>
          </div>
        </div>
        `)
    }
    async function updateFeed(){
        let data = await getNews();
        for (let n of data){
            addNew(n)
        }
    }
})

