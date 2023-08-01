var mysql = require('mysql2/promise');

// Conecta com o mysql
async function connect(){
    return await mysql.createConnection({
        host: "sitecoopsi.mysql.dbaas.com.br",
        user: "sitecoopsi",
        password: "AG!Mi5fUB4OCP@",
        database: "sitecoopsi"
      });
}
  
// Métodos
async function select(table){
    let con = await connect()
    let [rows, fields] = await con.execute(`SELECT * FROM sitecoopsi.${table}`)
    con.end()
    return rows
}
async function where(table, col, val){
    let con = await connect()
    let [rows, fields] = await con.execute(`SELECT * FROM ${table} WHERE ${col} = '${val}'`)
    con.end()
    return rows
}
async function create(table, data){
    let con = await connect()
    // Determina os nomes de campos da tabela
    let [rows, fields] = await con.execute(`SELECT * FROM sitecoopsi.${table}`) // Captura os fields
    let col_names = "";
    for(let o of fields){
        col_names+= o.name + ","
    }
    col_names = col_names.slice(3,-1)

    // Organiza os dados para inserir
    let col_data = "";
    for(let d of data){
        col_data+= "?" + ","
    }
    col_data = col_data.slice(0,-1)

    // Faz o insert
    let query = `INSERT INTO \`sitecoopsi\`.\`${table}\` (${col_names}) VALUES (${col_data})`;
    let r = await con.execute(query, data)
}

module.exports = {connect, create, select, where}