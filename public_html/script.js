// Variáveis
let Cooperados = []; // Lista geral de psis
let Bairros = []; // Lista geral de Bairros
let local = [];

// Lista de serviços da tabela FENAPSI
const servicos = [
  ["Mais Buscados",
    [
    ]
  ],
  ["Diagnostico Psicológico",
    [
      [11, "Consulta Psicológica"],
      [12, "Anamnese"],
      [13, "Elaboração de perfil profissiográfico"],
      [14, "Avaliação de desempenho escolar e aprendizagem"],
      [15, "Avaliação Psicológica"],
      [16, "Avaliação das características psicológicas esportivas"],
      [17, "Avaliação de prontidão para alfabetização"],
      [18, "Avaliação de nível intelectual"],
      [19, "Avaliação Psicomotora"],
      [110, "Avaliação Psicomotora Relacionada ao Grafismo"],
      [111, "Avaliação das características da personalidade"],
      [112, "Avaliação da estrutura e dinâmica da personalidade "],
      [113, "Entrevista devolutiva"],
      [114, "Observação de campo com visita escolar e domiciliar"],
      [115, "Atuação junto à comunidade"],
      [116, "Realização de exames psicológicos (psicotécnicos)"],
      [117, "Realização de avaliação psicológica p\ Carteira Nacional de Habilitação"],
      [118, "Realização de avaliação psicológica p\ concessão de registro e/ou porte de arma de fogo"]
    ]
  ],
  ["Orientação e Seleção Profissional",
    [
      [21, "Orientação Vocacional"],
      [22, "Recrutamento e seleção de pessoal"],
      [23, "Elaboração de instrumentos psicológicos"],
      [24, "Desenvolvimento de projetos relativos ao trabalho"],
      [25, "Identificação de necessidades humanas"],
      [26, "Partic. em prog. Educacionais, culturais, recretativos"],
      [27, "Orientação e acompanhamento"],
      [28, "Orientação e encaminhamento de empregados"],
      [29, "Avaliação de programa de treinamento"],
      [210, "Orientação e Treinamento/ Desenvolvimento"],
      [211, "Desligamento de empregados"],
      [212, "Preparação para aposentadoria "],
    ]
  ],
  ["Orientação e Psicopedagógica",
    [
      [31, "Realização de pesquisas"],
      [32, "Planejamento psicopedagógico"],
      [33, "Orientação psicopedagógico"],
      [34, "Preparação para aposentadoria "],
    ]
  ],
  ["Solução de Problemas Psicológicos",
    [
      [41, "Psicomotricidade individual"],
      [42, "Psicomotricidade em grupo"],
      [43, "Problemas de aprendizagem individual"],
      [44, "Problemas de aprendizagem em grupo"],
      [45, "Psicoterapia individual"],
      [46, "Psicoterapia em casal"],
      [47, "Psicoterapia familiar"],
      [48, "Psicoterapia em grupo"],
      [49, "Ludoterapia individual"],
      [410, "Ludoterapia em grupo"],
      [411, "Terapia psicomotora individual"],
      [412, "Terapia psicomotora em grupo"],
    ]
  ],
  ["Acompanhamento e Orientação Psicológica",
    [
      [51, "Acompanhamento psicológico da gravidez, parto e puerperio"],
      [52, "Acompanhamento psicológico da gravidez em grupo"],
      [53, "Acompanhamento psicoterapêutico"],
      [54, "Acompanhamento psicológico de deficientes"],
      [55, "Acompanhamento psicológico de idosos"],
      [56, "Acompanhamento e reabilitação profissional"],
    ]
  ],
  ["Assessoria em Psicologia",
    [
      [61, "Consultoria empresarial"],
      [62, "Realização de pesquisa"],
      [63, "Movimentação de pessoal"],
      [64, "Supervisão de atividades psicológicas"],
      [65, "Assessorias a instituições escolares"]
    ]
  ]
]

// Seletores HTML
const servicoSelect = document.getElementById('servicoOferecido');
const localInput = document.getElementById('localizacao');
const loading = document.getElementById('spinner');

// Serviços google
var geocoder = new google.maps.Geocoder();
var autocomplete = new google.maps.places.Autocomplete(localInput, {
  types: ['geocode'], // Filtrar apenas resultados de geocodificação (locais),
});

// Inicialização dos Dados
init()

// Funções
async function init() {
  Cooperados = await loadPsis()
  Bairros = await loadBairros()
  loadServicos()
}

async function loadPsis() {
  // Carrega o csv
  var response = await fetch('psicologos.csv')
  var data = await response.text()
  lista = CSV.parse(data)
  // Cria e popula a lista de cooperados
  let header = lista.shift()
  let coop = []
  for (let line of lista) {
    let item = {}
    for (let col = 0; col < header.length; col++) {
      item[header[col]] = line[col]
    }
    coop.push(item)
  }
  // Organiza as células-array
  for (let psi of coop) {
    psi["FaixasEtarias"] = psi["FaixasEtarias"].toString().split(',').filter(e => e != "")
    psi["PublicoAlvo"] = psi["PublicoAlvo"].toString().split(',').filter(e => e != "")
    psi["Servicos"] = psi["Servicos"].toString().split(',').filter(e => e != "")
  }
  return coop
}

async function loadBairros() {
  let bairros = {}
  for (let psi of Cooperados) {
    // Evita resultados vazios
    if (psi["Bairro"] == '') continue 

    // Cria os bairros e adiciona os psis de cada um
    if (!bairros[psi["Bairro"]]) {
      bairros[psi["Bairro"]] = {}
      bairros[psi["Bairro"]].nome = psi["Bairro"]
      bairros[psi["Bairro"]].cooperados = []
      bairros[psi["Bairro"]].servicos = []
      bairros[psi["Bairro"]].coord = await getCoord(psi["Bairro"] + ", ES")
    }
    bairros[psi["Bairro"]].cooperados.push(psi.ID)

    // Lista os serviços oferecidos pelos psis no bairro
    for (let s of psi["Servicos"]) {
      let index = bairros[psi["Bairro"]].servicos.findIndex(e => e[0] === parseInt(s))
      if (index == -1) {
        bairros[psi["Bairro"]].servicos.push([parseInt(s), 1])
      } else {
        bairros[psi["Bairro"]].servicos[index][1]++
      }
    }
  }
  return bairros
}

function loadServicos() {
  // Verifica quais os serviços ofertados pelos cooperados e quantos os oferecem
  let servicos_ofertados = []
  let servicos_ofertados_count = []
  for (let psi of Cooperados) {
    for (let ser of psi["Servicos"]) {
      if (ser == "") continue // Evita resultados em branco
      if (!servicos_ofertados.includes(ser)) {
        servicos_ofertados.push(ser)
        servicos_ofertados_count.push(1)
      } else {
        let i = servicos_ofertados.findIndex(a => a == ser)
        servicos_ofertados_count[i]++
      }
    }
  }
  // Calcula quais serviços estão na Categoria Frequentes
  let ranking_servicos = []
  for (var i = 0; i < servicos_ofertados.length; i++) {
    ranking_servicos.push([parseInt(servicos_ofertados[i]), servicos_ofertados_count[i]])
  }
  ranking_servicos = ranking_servicos.sort((a, b) => b[1] - a[1]).slice(0, 5)
  for (let i of ranking_servicos) {
    for (let categoria of servicos) {
      for (let s of categoria[1]) {
        if (s[0] == i[0]) {
          i[1] = s[1]
        }
      }
    }
  }
  servicos[0][1] = ranking_servicos
  // Adiciona as opções ao Select
  for (let categoria of servicos) {
    var optgroup = document.createElement('optgroup')
    optgroup.label = categoria[0]
    servicoSelect.appendChild(optgroup);
    for (let s of categoria[1]) {
      if (servicos_ofertados.includes(s[0].toString())) {
        var opt = document.createElement('option');
        opt.value = s[0];
        opt.innerHTML = s[1];
        optgroup.appendChild(opt);
      }
    }
  }
}

async function showResultados() {
  // Limpa os resultados
  document.getElementById('psychologistAccordion').innerHTML = '';
  // Faz um carregamento falso
  loading.hidden = false
  await sleep(450)
  loading.hidden = true
  // Verifica o serviço escolhido
  let servico = servicoSelect.value || 0;
  // Cria uma nova lista pra ordem de exibições
  let resultados = []
  // Converte bairros para uma lista
  let Bairros_ = []
  for (let key in Bairros) {
    Bairros_.push(Bairros[key])
  }
  // Filtros
  // Servicos
  for (let i of Bairros_) {
    if (i["servicos"].some(e => e[0] === parseInt(servico)) || servico == 0) {
      resultados.push(i)
    }
  }
  // Proximidade
  if (localInput.value != '') {
    resultados.sort(function(a, b) {
      a.dist = parseInt(getDist(a.coord, local)) / 1000;
      b.dist = parseInt(getDist(b.coord, local)) / 1000;
      if (a.nome == "Online") a.dist = 0
      if (b.nome == "Online") b.dist = 0
      return a.dist - b.dist;
    })
    // Limita a 5 primeiros resultados  
    resultados = resultados.slice(0, 5)
  }

  // Insere os itens
  if (resultados.length > 0) {
    let index = 0
    for (let item of resultados) {
      addItem(index, item)
      index++;
    }
  }

  // Adiciona os listeners
  let r = document.querySelectorAll('.resultado-expand');
  for (let resultado of r) {
    resultado.addEventListener('click', exibirLista);
    //resultado.addEventListener('mouseout', ocultarLista);
  }
}

function addItem(index, dict) {
  // Prepara dados
    // Serviços
    let servText = "", distText = "", count;
    if (servicoSelect.value == "0") {
      count = dict["servicos"].length
      servText = `
      <div class="row mt-1 serv-text">
        <div class="col-12">
          <p class="card-text"><i class="fa-solid fa-clipboard-check fa-lg pink-icon"></i>${count} Serviços Ofertados</p>
        </div>
      </div>
      `
    }
  // Link de Conversa
  let link = "https://wa.me/5527996953392?text=";
  if (servicoSelect.value == 0) {
    link += `Olá! Gostaria de marcar um atendimento em ${dict["nome"]}. Poderia me dar mais informações?`
  } else {
    link += `Olá! Estou procurando ${servicoSelect.options[servicoSelect.selectedIndex].text} em ${dict["nome"]}. Poderia me dar mais informações?`
  }

  // Criar o elemento HTML para o resultado da busca
  const psychologistProfile = `
  <div id="result-${index}" class="card border-dark mb-3 overflow-hidden resultado">
    <div class="row">
      <div class="col-9">
        <div class="card-body">
          <h5 class="card-title">${dict["nome"]}</h5>
          <div class="row dist-text">
            <div class="col-12">
              <p class="card-text"><i class="fa-solid fa-building fa-lg pink-icon"></i> ${parseInt(dict["dist"])} Km</p>
            </div>
          </div>
          ${servText}
          ${criarListaServicos(dict["servicos"])}
        </div>
      </div>
      <div class="w-button col-3 rounded-end d-flex justify-content-center align-items-center">
        <a href="${link}" style="text-decoration: none">
          <div>
            <i class="w-icon fa-brands fa-whatsapp fa-2x"></i> <i class="fa-solid fa-chevron-right fa-2x"></i>
          </div> 
        </a>
      </div>
    </div>
  </div>
`;
  document.getElementById('psychologistAccordion').innerHTML += psychologistProfile;

  let e = document.getElementById("result-" + index)
  // Oculta informações indisponíveis
  if (localInput.value == '' || dict["nome"] == "Online") {
    e.querySelector(".dist-text").hidden = true
  }

}

function servicoNome(id) {
  for (let cat of servicos) {
    for (let s of cat[1]) {
      if (s[0] == id) {
        if (s[1] == "") console.log(s)
        return s[1]
      }
    }
  }
  return id
}

function criarListaServicos(servicos) {
  const colunas = 2; // Número de colunas desejado
  const totalServicos = servicos.length;
  const itensPorColuna = Math.ceil(totalServicos / colunas);

  if (servicoSelect.value != "0") return ""

  let listaHtml = `
  <div class="row mt-2 lista-servicos fs-6" hidden>
    <div class="col">
      <ul class='mb-0'>
  `

  // Loop para criar os itens da lista
  for (let i = 0; i < totalServicos; i++) {
    // Adiciona a tag <li> com o serviço
    listaHtml += `<li>${servicoNome(servicos[i][0])}</li>`;

    // Verifica se precisa criar uma nova coluna
    if ((i + 1) % itensPorColuna === 0 && i + 1 !== totalServicos) {
      listaHtml += `
          </ul>
        </div>
        <div class="col">
          <ul>
      `
    }
  }

  listaHtml += `
      </ul>
    </div>
  </div>
  <div class="d-flex justify-content-center mt-2 mb-2 resultado-expand">
    <i class="fa-solid fa-chevron-down fa-sm"></i>
  </div>
  `

  return listaHtml;
}

function getDist(p1, p2) {
  // Função de Radianos
  p1 = [parseFloat(p1[0]), parseFloat(p1[1])]
  p1 = [parseFloat(p1[0]), parseFloat(p1[1])]
  var R = 6378137; // Earth’s mean radius in 
  var dLat = (p2[0] - p1[0]) * Math.PI / 180;
  var dLong = (p2[1] - p1[1]) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1[0]) * Math.PI / 180) * Math.cos((p2[0]) * Math.PI / 180) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

function getLocal() {
  if (navigator.geolocation) {
    console.log('navigator.geolocation',navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('position',position)
        local = [position.coords.latitude, position.coords.longitude]
        const latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        geocoder
          .geocode({ location: latlng })
          .then((response) => {
            console.log('response', response)
            if (response.results[0]) {
              localInput.value = response.results[0].formatted_address
            } else {
              window.alert("Local não Encontrado");
            }
          })
      }
    );
  }else {
    alert("Serviço de GPS indisponivel.")
  }
}

async function getCoord(address) {
  if (address == "") address = "Centro de Vitória"
  if (address == "Online") address = "Centro de Vitória"

  try {
    let r = await geocoder.geocode({ address: address })
  } catch (error) {
    r = await geocoder.geocode({ address: address })
  }
  return [r.results[0].geometry.location.lat(), r.results[0].geometry.location.lng()]
}

function exibirLista(event) {
  // Verifica se é necessário exibir lista
  if (servicoSelect.value != 0) return false

  // Cria seletores
  const resultado = event.target.closest('.resultado');
  const listaServicos = resultado.querySelector('.lista-servicos');
  const expand = resultado.querySelector('.resultado-expand');

  // Se já tiver expandido, contrai a lista
  if (!listaServicos.hidden) {
    listaServicos.hidden = true
    expand.innerHTML = `<i class="fa-solid fa-chevron-down fa-sm"></i>`
    return true
  }


  // Rola para o resultado expandido
  resultado.scrollIntoView({behavior: "smooth"})
  window.scrollBy(0,-10)

  // Oculta a lista de serviços de todos os resultados
  const resultados = document.querySelectorAll('.resultado');
  resultados.forEach((r) => {
    r.querySelector('.lista-servicos').hidden = true;
    r.children[0].querySelector('.resultado-expand').innerHTML = `<i class="fa-solid fa-chevron-down fa-sm"></i>`
  });

  // Exibe a lista de serviços do resultado atual
  listaServicos.hidden = false
  // Modifica o botão de expandir
  expand.innerHTML = `<i class="fa-solid fa-chevron-up fa-sm"></i>`
}

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// Listeners
autocomplete.addListener("place_changed", () => {
  let l = autocomplete.getPlace()
  if (l) {
    l = l.geometry.location
    local = [l.lat(), l.lng()]
  }
})