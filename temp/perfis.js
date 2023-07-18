// Variáveis
let lista = []; // Lista geral de psis

// Inicialização
loadPsis()

// Funções
async function loadPsis() {
  var response = await fetch('psicologos.csv')
  var data = await response.text()
  lista = CSV.parse(data)
  // Organiza as células-array
  for (let item of lista) {
    item[9] = item[9].toString().split(',')
    item[10] = item[10].toString().split(',')
    item[13] = item[13].toString().split(',')
  }
  showLista()
}

function showLista() {

  // Limpa os resultados
  document.getElementById('psychologistAccordion').innerHTML = '';
  let index = 1;
  for (let item of lista) {
    addItem(index, item)
    index++;
  }
}

function addItem(index, dict) {
  // Prepara dados
  // Faixa Etaria
  var etaria = ''
  for (var i of dict[9]) {
    switch (i) {
      case '1': etaria += 'Crianças, '
        break
      case '2': etaria += 'Adolescentes, '
        break
      case '3': etaria += 'Jovens, '
        break
      case '4': etaria += 'Adultos, '
        break
      case '5': etaria += 'Idosos, '
        break
    }
  }
  etaria = etaria.substring(0, etaria.length - 2);
  // Publico Específico
  var publico = ''
  for (var i of dict[10]) {
    switch (i) {
      case '1': publico += 'Adultos vítimas de abuso na infância, '
        break
      case '2': publico += 'Dependentes Químicos, '
        break
      case '3': publico += 'Etnia minoritária, '
        break
      case '4': publico += 'LGBTQI+, '
        break
      case '5': publico += 'Luto e trauma, '
        break
      case '6': publico += 'Pacientes psiquiátricos, '
        break
      case '7': publico += 'Portador de necessidades especiais, '
        break
      case '8': publico += 'Povos tradicionais, '
        break
      case '9': publico += 'Puérperas, '
        break
      case '10': publico += 'Relacionamentos Abusivos, '
        break
      case '11': publico += 'Vítimas de violência, '
        break
      case '12': publico += 'Vulnerabilidade social, '
        break
      case '13': publico += 'Mulheres em Vulnerabilidade, '
        break
      case '14': publico += 'Psicólogos, '
        break
    }
  }
  publico = publico.substring(0, publico.length - 2);
  // Serviços
  var servico = ''
  for (var i of dict[13]) {
    switch (i) {
      case "11": servico += "Consulta Psicológica, "
        break
      case "12": servico += "Anamnese, "
        break
      case "13": servico += "Elaboração de perfil profissiográfico, "
        break
      case "14": servico += "Avaliação de desempenho escolar e aprendizagem, "
        break
      case "15": servico += "Avaliação Psicológica, "
        break
      case "16": servico += "Avaliação das características psicológicas esportivas, "
        break
      case "17": servico += "Avaliação de prontidão para alfabetização, "
        break
      case "18": servico += "Avaliação de nível intelectual, "
        break
      case "19": servico += "Avaliação Psicomotora, "
        break
      case "110": servico += "Avaliação Psicomotora Relacionada ao Grafismo, "
        break
      case "111": servico += "Avaliação das características da personalidade, "
        break
      case "112": servico += "Avaliação da estrutura e dinâmica da personalidade, "
        break
      case "113": servico += "Entrevista devolutiva, "
        break
      case "114": servico += "Observação de campo com visita escolar e domiciliar, "
        break
      case "115": servico += "Atuação junto à comunidade, "
        break
      case "116": servico += "Realização de exames psicológicos (psicotécnicos), "
        break
      case "117": servico += "Realização de avaliação psicológica p\ Carteira Nacional de Habilitação, "
        break
      case "118": servico += "Realização de avaliação psicológica p\ concessão de registro e/ou porte de arma de fogo, "
        break
      case "21": servico += "Orientação Vocacional, "
        break
      case "22": servico += "Recrutamento e seleção de pessoal, "
        break
      case "23": servico += "Elaboração de instrumentos psicológicos, "
        break
      case "24": servico += "Desenvolvimento de projetos relativos ao trabalho, "
        break
      case "25": servico += "Identificação de necessidades humanas, "
        break
      case "26": servico += "Partic. em prog. Educacionais, culturais, recretativos, "
        break
      case "27": servico += "Orientação e acompanhamento, "
        break
      case "28": servico += "Orientação e encaminhamento de empregados, "
        break
      case "29": servico += "Avaliação de programa de treinamento, "
        break
      case "210": servico += "Orientação e Treinamento/ Desenvolvimento, "
        break
      case "211": servico += "Desligamento de empregados, "
        break
      case "212": servico += "Preparação para aposentadoria , "
        break
      case "31": servico += "Realização de pesquisas, "
        break
      case "32": servico += "Planejamento psicopedagógico, "
        break
      case "33": servico += "Orientação psicopedagógico, "
        break
      case "34": servico += "Preparação para aposentadoria , "
        break
      case "41": servico += "Psicomotricidade individual, "
        break
      case "42": servico += "Psicomotricidade em grupo, "
        break
      case "43": servico += "Problemas de aprendizagem individual, "
        break
      case "44": servico += "Problemas de aprendizagem em grupo, "
        break
      case "45": servico += "Psicoterapia individual, "
        break
      case "46": servico += "Psicoterapia em casal, "
        break
      case "47": servico += "Psicoterapia familiar, "
        break
      case "48": servico += "Psicoterapia em grupo, "
        break
      case "49": servico += "Ludoterapia individual, "
        break
      case "410": servico += "Ludoterapia em grupo, "
        break
      case "411": servico += "Terapia psicomotora individual, "
        break
      case "412": servico += "Terapia psicomotora em grupo, "
        break
      case "51": servico += "Acompanhamento psicológico da gravidez, parto e puerperio, "
        break
      case "52": servico += "Acompanhamento psicológico da gravidez em grupo, "
        break
      case "53": servico += "Acompanhamento psicoterapêutico, "
        break
      case "54": servico += "Acompanhamento psicológico de deficientes, "
        break
      case "55": servico += "Acompanhamento psicológico de idosos, "
        break
      case "56": servico += "Acompanhamento e reabilitação profissional, "
        break
      case "61": servico += "Consultoria empresarial, "
        break
      case "62": servico += "Realização de pesquisa, "
        break
      case "63": servico += "Movimentação de pessoal, "
        break
      case "64": servico += "Supervisão de atividades psicológicas, "
        break
      case "65": servico += "Assessorias a instituições escolares, "
        break
    }
  }
  servico = servico.substring(0, servico.length - 2);

  //Criar o elemento HTML para o perfil do psicólogo
  const psychologistProfile = `
  <div class="accordion-item">
    <h2 class="accordion-header" id="heading${index}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" data-bs-parent="#psychologistAccordion" aria-controls="collapse${index}">
        ${dict[0]}
      </button>
    </h2>
    <div id="collapse${index}" class="accordion-collapse collapse sh" aria-labelledby="heading${index}" data-bs-parent="#psychologistAccordion">
      <div class="accordion-body">
        <div class="row">
          <div class="col-md-4">
            <img class="profile-image" src="Fotos/${dict[0]}.png" alt="Foto de Perfil" class="profile-image">
            <h4>${dict[0]}</h4>
            <ul class="list-unstyled">
              <li><strong>Nº do CRP:</strong> ${dict[3]}</li>
            </ul>
          </div>
          <div class="col-md-8">
            <h4>Mini Currículo</h4>
            <ul class="list-unstyled">
              <li><strong>Tempo de Experiência:</strong> ${dict[6]} ano(s)</li>
              <li><strong>Abordagem:</strong> ${dict[7]}</li>
              <li><strong>Formação:</strong> ${dict[4]} </li>
              <li>${dict[5]}</li>
              <li><strong>Público-Alvo:</strong> ${etaria}</li>
              <li><strong>Focos Especiais:</strong> ${publico}</li>
              <li><strong>Atende Online:</strong> ${dict[20]}</li>
            </ul>
            <h4>Serviços</h4>
            <ul class="list-unstyled">
              <li>${servico}</li>
            </ul>
            <h4>Endereço</h4>
            <ul class="list-unstyled">
              <li><strong>Horário de Funcionamento:</strong> ${dict[19]}</li>
              <li>${dict[17]}</li>
            </ul>
            <img hidden class="adress-image" src="FOTO_FRONTAL_ENDERECO_URL" alt="Foto Frontal do Endereço" class="address-image">
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  document.getElementById('psychologistAccordion').innerHTML += psychologistProfile;
}

function getBairros(){
  let bairros = []
  for (let psi in lista){
    if (bairros.includes(psi[]))
  }
}