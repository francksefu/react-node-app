import connection from "./config.mjs"

class Categorie {
    static categories;

    static insert({name, isHaveLimit, amountLimit}, idUser) {
        return new Promise((resolve) => {
            let lastId;
            let categorie = {name, isHaveLimit, amountLimit, idUser}
            let query = connection.query('INSERT INTO categorie SET ?', categorie, function(err, results, fields) {
                if (err) throw err;
                lastId = results.insertId;
            })
            let sql = `SELECT * FROM categorie WHERE categorie.idUser=${idUser} order by id desc`;
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                resolve(JSON.stringify(results));
            })
           //Categorie.recoverCategories(resolve, idUser);
            
        })
        
        
    }
    static recoverCategories(resolve, idUser) {
        let sql = `SELECT * FROM categorie WHERE categorie.idUser=${idUser} order by id desc`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            resolve(JSON.stringify(results));
        })
    }
    /**
     * This function retrieves all categories from the database and returns them as a JSON string.
     * The categories are sorted in descending order by their ID.
     *
     * @returns {string} - A JSON string containing all categories.
     */
    static selectAll(idUser=1) {
        let sql = `SELECT * FROM categorie where idUser=${idUser} order by id desc`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            Categorie.categories = JSON.stringify(results);
        })
        return Categorie.categories;
    }

    static update({name, isHaveLimit, amountLimit, id}, idUser) {
        return new Promise((resolve) => {
            let sql = 'UPDATE categorie SET name = ?, isHaveLimit = ?, amountLimit = ? WHERE id = ?';
            let contentUpdate = [name, isHaveLimit, amountLimit, id];
            connection.query(sql, contentUpdate, function (error, results, fields) {
                if (error) throw error;
            });
            Categorie.recoverCategories(resolve, idUser);
        })
        
        
    }

    static delete (id, idUser) {
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
            Categorie.recoverCategories(resolve, idUser);
        })
        
    }
}

export default Categorie;