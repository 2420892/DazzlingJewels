const db =require("../config")

class Products{
    fetchProducts(req,res){
        const query =`
        SELECT prodID, prodName, amount, category, image,gender
        FROM Products;
        `
        db.query(query,(err,results)=>{
            if (err) throw err
            res.json({
                status: res.statusCode,
                results
            })
        })
    }
    fetchProduct(req,res){
        const query =`
        SELECT prodID, prodName, amount, category, image,gender
        FROM Products
        WHERE prodID = ${req.params.id};
        `
        db.query(query, (err, result) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                result
            });
        }); 
    }
    addProduct(req, res) {
        const query = `
        INSERT INTO Products
        SET ?;
        `;

        db.query(query, [req.body], (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: "The product was added."
            });
        });
    }

    updateProduct(req, res) {
        const query = `
        UPDATE Products
        SET ?
        WHERE prodID = ?;
        `;

        db.query(query, [req.body, req.params.id], (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: "The product record was updated."
            });
        });
    }

    deleteProduct(req, res) {
        const query = `
        DELETE FROM Products
        WHERE prodID = ${req.params.id};
        `;

        db.query(query, (err) => {
            if (err) throw err;
            res.json({
                status: res.statusCode,
                msg: "A product record was deleted."
            });
        });
    }
}

module.exports = Products;