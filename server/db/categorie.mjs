import connection from "./config.mjs"

class Categorie {
    static categories;

    static insert(name, isHaveLimit, amountLimit, date) {
        let lastId;
        let categorie = {name, isHaveLimit, amountLimit, date}
        let query = connection.query('INSERT INTO categorie SET ?', categorie, function(err, results, fields) {
            if (err) throw err;
            lastId = results.insertId;
        });
        return lastId;
    }

    static selectAll() {
        let sql = 'SELECT * FROM categorie';
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            Categorie.categories = JSON.stringify(results);
        });
        return Categorie.categories;
    }

    static update(name, isHaveLimit, amountLimit, date, id) {
        let sql = 'UPDATE categorie SET name = ?, isHaveLimit = ?, amountLimit = ?, date = ?, WHERE id = ?';
        let contentUpdate = [name, isHaveLimit, amountLimit, date, id];
        connection.query(sql, contentUpdate, function (error, results, fields) {
            if (error) throw error;
        });
        return true;
    }

    static delete (id) {
        let sql = 'DELETE categorie WHERE id = ?';
        connection.query(sql, id, function (error, results, fields) {
            if (error) throw error;
        });
        return true;
    }
}

export default Categorie;