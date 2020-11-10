import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { Client } from 'pg';

import { dbConfig } from '../db/dbConfig';

import insertProductQuery from '../db/dbQuery/insertProduct';
import insertStockQuery from '../db/dbQuery/insertStock';

export const createProduct: APIGatewayProxyHandler = async (event) => {

  console.log('createProduct event: ' + JSON.stringify(event));

    const productData = JSON.parse(event.body);
    const {description, title, price, count} = productData;


    if (typeof description !== 'string'
        || typeof title !== 'string' 
        || typeof price !== 'number' 
        || typeof count !== 'number') {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: `Invalid product data: ${JSON.stringify(productData)}`
          }
    }

    const client = new Client(dbConfig);
    await client.connect();

    try {
        const insertProductRes = await client.query(insertProductQuery, [description, title, price, count]);
        const productId =  insertProductRes.rows[0];

        if (!productId) {
            return {
              statusCode: 400,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
              },
              body: JSON.stringify({ message: 'Product was not added' }),
            };
          };

        await client.query(insertStockQuery, [productId, count]);

        return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: 'Product was added' }),
          };
       
    } catch (e) {
        console.error(e)
        return {
        statusCode: 500,
        body: `There is an unexpected error ${ JSON.stringify(e.message) }`
        }
    } finally {
        await client.end();
    }
}