import connection from "./config.mjs"

class User {
    static user;

    static insert({username, password}) {
        return new Promise((resolve) => {
            let lastId;
            let user = {username, password}
            let query = connection.query('INSERT INTO user SET ?', user, function(err, results, fields) {
                if (err) throw err;
                lastId = results.insertId;
                return lastId
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
        let sql = 'SELECT * FROM user order by id desc';
        connection.query(sql, function (error, results, fields) {
            if (error) throw error;
            User.user = JSON.stringify(results);
        })
        return User.user;
    }

    static update({username, password, id}) {
        return new Promise((resolve) => {
            let sql = 'UPDATE user SET username = ?, password = ? WHERE id = ?';
            let contentUpdate = [username, password, id];
            connection.query(sql, contentUpdate, function (error, results, fields) {
                if (error) throw error;
            });
            
        })
        
        
    }

    static delete (id) {
        return new Promise((resolve) => {
            let sql = 'DELETE FROM user WHERE id = ?';
            connection.query(sql, parseInt(id), function (error, results, fields) {
                if (error) throw error;
            })
        })
        
    }
}

export default User;