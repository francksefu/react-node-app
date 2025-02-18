import connection from "./config.mjs"

class Categorie {
    static categories;

    static insert({name, isHaveLimit, amountLimit}) {
        return new Promise((resolve) => {
            let lastId;
            let categorie = {name, isHaveLimit, amountLimit}
            let query = connection.query('INSERT INTO categorie SET ?', categorie, function(err, results, fields) {
                if (err) throw err;
                lastId = results.insertId;
            })
            let sql = 'SELECT * FROM categorie order by id desc';
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                resolve(JSON.stringify(results));
            })
            
        })
        
        
    }

    static selectAll() {
        let sql = 'SELECT * FROM categorie order by id desc';
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            Categorie.categories = JSON.stringify(results);
        })
        return Categorie.categories;
    }

    static update({name, isHaveLimit, amountLimit}) {
        return new Promise((resolve) => {
            let sql = 'UPDATE categorie SET name = ?, isHaveLimit = ?, amountLimit = ? WHERE id = ?';
            let contentUpdate = [name, isHaveLimit, amountLimit, id];
            connection.query(sql, contentUpdate, function (error, results, fields) {
                if (error) throw error;
            });
            let sqlReturnData = 'SELECT * FROM categorie order by id desc';
            connection.query(sqlReturnData, function (error, results, fields) {
                if (error) throw error;
                resolve(JSON.stringify(results));
            })
        })
        
        
    }

    static delete (id) {
        return new Promise((resolve) => {
            let sql = 'DELETE FROM categorie WHERE id = ?';
            connection.query(sql, parseInt(id), function (error, results, fields) {
                if (error) throw error;
            });
            let sqlReturnData = 'SELECT * FROM categorie order by id desc';
            connection.query(sqlReturnData, function (error, results, fields) {
                if (error) throw error;
                resolve(JSON.stringify(results));
            })
        })
        
    }
}

export default Categorie;