import {APIGatewayProxyHandler} from 'aws-lambda';

import { productsList } from '../mockProductsList'

export const getProductsList: APIGatewayProxyHandler = async () => {

  try {
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
  }
}