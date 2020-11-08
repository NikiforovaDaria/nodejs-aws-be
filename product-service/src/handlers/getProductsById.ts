import { APIGatewayProxyHandler } from 'aws-lambda';

import { productsList } from '../mockProductsList';

export const getProductsById: APIGatewayProxyHandler = async event => {
  try {
    const { productId } = event.pathParameters;

    const productById = productsList.find(product => product.id === productId);

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
  }
}