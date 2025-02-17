import connection from "./config.mjs"

class Expense {
    static expenses;

    static insert({date, amount, description, idCategorie}) {
        return new Promise((resolve) => {
            let lastId;
            let expense = {amount, date, description, idCategorie}
            let query = connection.query('INSERT INTO expense SET ?', expense, function(err, results, fields) {
                if (err) throw err;
                lastId = results.insertId;
            })
            let sql = 'SELECT * FROM expense order by id desc';
            connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                resolve(JSON.stringify(results));
            })
            
        })
        
        
    }

    static selectAll() {
        let sql = 'SELECT * FROM expense order by id desc';
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            Expense.expenses = JSON.stringify(results);
        })
        return Expense.expenses;
    }

    static update({amount, date, description, idCategorie, id}) {
        return new Promise((resolve) => {
            let sql = 'UPDATE expense SET amount = ?, date = ?, description = ?, idCategorie = ? WHERE id = ?';
            let contentUpdate = [amount, date, description, idCategorie, id];
            connection.query(sql, contentUpdate, function (error, results, fields) {
                if (error) throw error;
            });
            let sqlReturnData = 'SELECT * FROM expense order by id desc';
            connection.query(sqlReturnData, function (error, results, fields) {
                if (error) throw error;
                resolve(JSON.stringify(results));
            })
        })
        
        
    }

    static delete (id) {
        return new Promise((resolve) => {
            let sql = 'DELETE FROM expense WHERE id = ?';
            connection.query(sql, parseInt(id), function (error, results, fields) {
                if (error) throw error;
            });
            let sqlReturnData = 'SELECT * FROM expense order by id desc';
            connection.query(sqlReturnData, function (error, results, fields) {
                if (error) throw error;
                resolve(JSON.stringify(results));
            })
        })
        
    }
}

export default Expense;