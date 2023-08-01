const db = require('../backend/db_interface') 
const path = require('path');
const config = require('../config')

// Retorna o indice de Notícias
exports.getFront = (req, res) => {
    res.sendFile(path.join(config.initial_path, "noticias.html"))
}

// Retorna a visualização de uma Notícia
exports.getView = (req, res) => {
    if (req.params.slug == "noticia_view.js"){
        return res.sendFile(path.join(config.initial_path, "noticia_view.js"))
    } 
    if (req.params.slug == "style.css"){
        return res.sendFile(path.join(config.initial_path, "style.css"))
    }
    res.sendFile(path.join(config.initial_path, "noticia_view.html"))
}

// Retornar todos
exports.getAll = async (req, res) => {
    res.status(200).json({
        status: 'success',
        data: await db.select('news')
    });
};

// Retornar um
exports.getOne = async (req, res) => {
    res.status(200).json({
        status: 'success',
        data: await db.where('news','slug',req.params.slug)
    });
};

// Adicionar um
exports.postOne = async (req, res) => {
    let author_id = 3;
    let title = "5º COOPERAPSI: Encontro presencial fortalece a Cooperativa de Psicólogos do Espírito Santo";
    let slug = "5o-cooperapsi-encontro-presencial-fortalece-cooperativa-psicologos-es";
    let summary = "A Cooperativa de Psicólogos do Espírito Santo (COOPSI-ES) realizou o 5º #COOPERAPSI, encontro presencial que reuniu cooperados e parceiros. O evento apresentou avanços na gestão, discutiu oportunidades de prospecção e aprimorou estratégias de publicidade.";
    let timestamp = "2023-08-01 00:00:00";
    let content = "A Cooperativa de Trabalho dos Psicólogos do Espírito Santo (COOPSI-ES) realizou com êxito o aguardado 5º #COOPERAPSI, um encontro presencial que reuniu cooperados e parceiros para compartilhar avanços e estreitar laços. O evento cumpriu seus objetivos ao apresentar os progressos da gestão da cooperativa, discutir oportunidades de prospecção e aprimorar estratégias de publicidade.<br />A programação diversificada contou com a participação ativa dos cooperados, destacando as apresentações das novas instituições parceiras e as ferramentas digitais de gestão e publicidade. A cooperação entre a COOPSI-ES e organizações relevantes na área foi fortalecida, proporcionando melhores condições de trabalho e serviços aos clientes.<br />A participação entusiasmada dos cooperados demonstrou o espírito colaborativo e empreendedor da cooperativa, que busca constantemente expandir seus horizontes coletivamente. O 5º #COOPERAPSI reafirmou a importância da união dos profissionais de psicologia e transmitiu uma mensagem de esperança e crescimento para o futuro da COOPSI-ES, que continuará a atuar com qualidade, responsabilidade e trabalho em equipe, em prol do bem-estar da sociedade capixaba.";
    let img_path = "1.jpg";
    
    db.create('news', [author_id, title, title, slug, summary, timestamp, content, img_path])
};