const sql = require('./db.js');

const demo = function(myDemo) {
    this.title =myDemo.title;
    this.description = myDemo.description;
    this.published = myDemo.published;  
};

demo.create = (newDemo, result)=>{
    sql.query("INSERT INTO demo SET ?", newDemo, (err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }
        console.log("created demo: ", { id: res.insertId, ...newDemo });
        result(null, { id: res.insertId, ...newDemo });
    });
};

demo.findById = (id,result)=>{
    sql.query(`SELECT * FROM demo WHERE id = ${id}`, (err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(err,null);
            return;
        }

        if (res.length) {
            console.log("found demo: ", res[0]);
            result(null, res[0]);
            return;
        }
      
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
}

demo.getAll = (title, result)=>{
    let query = "SELECT * FROM demo";

    if(title){
        query+=` WHERE title like '%${title}%'`;
    }
    sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
    
        console.log("demos: ", res);
        result(null, res);
    });
}

demo.getAllPublished = result => {
    sql.query("SELECT * FROM demo WHERE published=true", (err, res) => {
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        
      console.log("demos: ", res);
      result(null, res);
    });
};

demo.updateById = (id, tutorial, result) => {
    sql.query(
      "UPDATE demo SET title = ?, description = ?, published = ? WHERE id = ?",
      [tutorial.title, tutorial.description, tutorial.published, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated demo: ", { id: id, ...tutorial });
        result(null, { id: id, ...tutorial });
      }
    );
};

demo.remove = (id, result) => {
    sql.query("DELETE FROM demo WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted demo with id: ", id, " & title: ", res.title);
      result(null, res);
    });
  };
  
demo.removeAll = result => {
    sql.query("DELETE FROM demo", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} demos`);
      result(null, res);
    });
};

module.exports = demo;