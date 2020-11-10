export default `SELECT product.id, product.title, product.description, product.price, stock.count
                FROM product
                INNER JOIN stock
                ON product.id = stock.product_id`