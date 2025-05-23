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

    /**
     * This function retrieves all categories from the database and returns them as a JSON string.
     * The categories are sorted in descending order by their ID.
     *
     * @returns {string} - A JSON string containing all categories.
     */
    static selectAll() {
        let sql = 'SELECT * FROM categorie order by id desc';
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            Categorie.categories = JSON.stringify(results);
        })
        return Categorie.categories;
    }

    static update({name, isHaveLimit, amountLimit, id}) {
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
            let sqlForDeleteRelatedExpense = 'DELETE FROM expense WHERE expense.idCategorie = ?';
            connection.query(sql, parseInt(id), function (error, results, fields) {
                if (error) {
                    throw error
                }else {
                    connection.query(sqlForDeleteRelatedExpense, parseInt(id), function (error, results, fields) {
                        if (error) throw error;
                    });
                }
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