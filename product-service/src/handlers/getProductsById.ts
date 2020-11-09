import { APIGatewayProxyHandler } from 'aws-lambda';
import { dbConfig } from '../db/dbConfig';
import { Client } from 'pg';

import getProductById from '../db/dbQuery/getProductById';

export const getProductsById: APIGatewayProxyHandler = async event => {
 
  const { productId } = event.pathParameters;

  const client = new Client(dbConfig);
  await client.connect();

  try {

    const getProductByIdRes = await client.query(getProductById, [productId]);
    const productById = getProductByIdRes.rows[0];

    return productById 
        ? {
            statusCode: 200,
            headers: { 
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true 
            },
            body: JSON.stringify(productById)
          } 
          : {
            statusCode: 404,
            body: JSON.stringify({ error: `Product with id: ${productId} is not found` })
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