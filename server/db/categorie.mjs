import connection from "config.mjs"

class Categorie {
    constructor(id = null, name, isHaveLimit = false, amountLimit = null, date = null) {
        this.id = id;
        this.name = name;
        this.isHaveLimit = isHaveLimit;
        this.amountLimit = amountLimit;
        this.date = date;
    }

    static insertCategorie(name, isHaveLimit, amountLimit, date) {
        let lastId;
        let categorie = {name, isHaveLimit, amountLimit, date}
        let query = connection.query('INSERT INTO categorie SET ?', categorie, function(err, results, fields) {
            if (err) throw err;
            lastId = results.insertId;
        })
        return lastId;
    }

    static getCategories() {
        let sql = 'SELECT * FROM categorie';
        let categories;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            categories = JSON.stringify(results);
        })
        return categories;
    }

    static updateCategorie(name, isHaveLimit, amountLimit, date, id) {
        let sql = 'UPDATE categorie SET name = ?, isHaveLimit = ?, amountLimit = ?, date = ?, WHERE id = ?';
        let contentUpdate = [name, isHaveLimit, amountLimit, date, id];
        connection.query(sql, contentUpdate, function (error, results, fields) {
            if (error) throw error;
        });
        return true;
    }

    static deleteCategorie (id) {
        let sql = 'DELETE categorie WHERE id = ?';
        connection.query(sql, id, function (error, results, fields) {
            if (error) throw error;
        });
        return true;
    }
}