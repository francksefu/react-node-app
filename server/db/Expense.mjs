//import 'dotenv/config';
import connection from "../../config.mjs"

class Expense {
    static expenses;

    static insert({date, amount, description, idCategorie}, idUser) {
        return new Promise((resolve) => {
            let lastId;
            let expense = {amount, date, description, idCategorie}
            let query = connection.query('INSERT INTO expense SET ?', expense, function(err, results, fields) {
                if (err) throw err;
                lastId = results.insertId;
            })
            Expense.recoverExpense(resolve, idUser);
            
        }) 
    }
    static recoverExpense (resolve, idUser) {
        let sql = `SELECT expense.id, expense.amount, expense.date, expense.description, expense.idCategorie, categorie.name FROM expense, categorie where (expense.idCategorie = categorie.id) and (categorie.idUser = ${idUser}) order by id desc`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            resolve(JSON.stringify(results));
        })
    }

    /*static selectAll(idUser) {
        let sql = `SELECT expense.id, expense.amount, expense.date, expense.description, expense.idCategorie, categorie.name FROM expense, categorie where (expense.idCategorie = categorie.id) and (categorie.idUser = ${idUser}) order by id desc`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            Expense.expenses = JSON.stringify(results);
        })
        return Expense.expenses;
    }*/
    static selectAllRelatedToCategories(idUser=1) {
        let sql = `SELECT expense.id, expense.amount, expense.date, expense.description, expense.idCategorie, categorie.name FROM expense, categorie where (expense.idCategorie = categorie.id) and (categorie.idUser = ${idUser}) order by id desc`;
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            Expense.expenses = JSON.stringify(results);
        })
        return Expense.expenses;
    }

    static update({amount, date, description, idCategorie, id}, idUser) {
        return new Promise((resolve) => {
            let sql = 'UPDATE expense SET amount = ?, date = ?, description = ?, idCategorie = ? WHERE id = ?';
            let contentUpdate = [amount, date, description, idCategorie, id];
            connection.query(sql, contentUpdate, function (error, results, fields) {
                if (error) throw error;
            });
            Expense.recoverExpense(resolve, idUser);
        })
        
        
    }

    static delete (id, idUser) {
        return new Promise((resolve) => {
            let sql = 'DELETE FROM expense WHERE id = ?';
            connection.query(sql, parseInt(id), function (error, results, fields) {
                if (error) throw error;
            });
            Expense.recoverExpense(resolve, idUser);
        })
        
    }
}

export default Expense;