let { buildSchema } = require('graphql');

let schema = buildSchema(`
type Query {
    products: [Product]
    product(id: ID!): Product
}
type Mutation {
    createProduct(titulo: String, descripcion: String): [NewProduct!],
    updateProduct(id: ID!, titulo: String!, descripcion: String!): Product,
    deleteProduct(id: ID!): [Product]
}
type Product {
    id: ID!
    titulo: String
    descripcion: String
}
type NewProduct {
    id: ID
    titulo: String
    descripcion: String
}
`);

module.exports = ({ schema })