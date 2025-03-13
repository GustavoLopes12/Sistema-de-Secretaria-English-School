import mysql from 'mysql';
import 'dotenv/config';

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

conexao.connect();

export const consulta = (sql, parametros = "", msgError) => {
    return new Promise((resolve, reject) => {
        conexao.query(sql, parametros,(error, result) => {
            if(error){
                return reject(msgError + "/ERRO_COMPLETO:/" + error);
            }else{
                //fazer o parse dos resultados
                const row = JSON.parse(JSON.stringify(result));
                return resolve(row);//me retorna um array com json puro sem wrapper(tipo um embrulho do mysql com algumas funcionalidades)
            }
        });
    });
}

export default conexao;