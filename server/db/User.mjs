import connection from "./config.mjs"

class User {
    static user;

    static isPromise(p) {
        if (typeof p === 'object' && typeof p.then === 'function') {
          return true;
        }
      
        return false;
      }

    static async insert({username, password, names, dateT}) {
        return new Promise((resolve) => {
            let lastId;
            let user = {username, password, names, dateT}
            let query = connection.query('INSERT INTO user SET ?', user, function(err, results, fields) {
                if (err) throw err;
                lastId = results.insertId;
                resolve(lastId);
            })
        })
        
    }

    static checkIfUsernameExist(username) {
        //check if the user exist before insert him
        let sql = 'SELECT * FROM user WHERE username = ? order by id desc';
        return new Promise((resolve) => {
            let content = [username]
            let query = connection.query(sql, content,function (error, results, fields) {
                if (error) throw error;
                resolve(results.length);
            })
            
        })
    }
    static selectAll() {
        let sql = 'SELECT * FROM user order by id desc';
        return new Promise((resolve) => {
            let query = connection.query(sql, function (error, results, fields) {
                if (error) throw error;
                resolve(JSON.stringify(results));
            })
            
        })
        
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