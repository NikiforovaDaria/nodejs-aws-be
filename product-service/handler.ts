
import 'source-map-support/register';

import { getProductsList } from './src/handlers/getProductsList';
import { getProductsById } from './src/handlers/getProductsById';

import { createProduct } from './src/handlers/createProduct';

export { getProductsList, getProductsById, createProduct }