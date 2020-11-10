import {APIGatewayProxyHandler} from 'aws-lambda';
import { Client } from 'pg';
import { dbConfig } from '../db/dbConfig';

import getProductsListQuery from '../db/dbQuery/getProductsList';



export const getProductsList: APIGatewayProxyHandler = async (event) => {

  console.log('getProductsList event: ' + JSON.stringify(event));

  const client = new Client(dbConfig);
  await client.connect();

  try {

    const { rows: productsList } = await client.query(getProductsListQuery)

    return {
      statusCode: 200,
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true 
      },
      body: JSON.stringify(productsList)
    }
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