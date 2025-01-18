import connection from "./config.mjs"

class Expense {
    static expenses;

    static insert({date, amount, description, idCategorie}) {
        let lastId;
        let expense = {amount, date, description, idCategorie}
        let query = connection.query('INSERT INTO expense SET ?', expense, function(err, results, fields) {
            if (err) throw err;
            lastId = results.insertId;
        })
        return true;
    }

    static selectAll() {
        let sql = 'SELECT * FROM expense';
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            Expense.expenses = JSON.stringify(results);
        })
        return Expense.expenses;
    }

    static update(amount, date, description, idCategorie, id) {
        let sql = 'UPDATE expense SET amount = ?, date = ?, description = ?, idCategorie = ?, WHERE id = ?';
        let contentUpdate = [amount, date, description, idCategorie, id];
        connection.query(sql, contentUpdate, function (error, results, fields) {
            if (error) throw error;
        });
        return true;
    }

    static delete (id) {
        let sql = 'DELETE expense WHERE id = ?';
        connection.query(sql, id, function (error, results, fields) {
            if (error) throw error;
        });
        return true;
    }
}

export default Expense;