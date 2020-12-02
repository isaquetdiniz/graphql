const { GraphQLScalarType } = require('graphql');

const userResolvers = {

    RolesType: {
        ESTUDANTE: "ESTUDANTE",
        DOCENTE: "DOCENTE",
        COORDENACAO: "COORDENACAO"
    },

    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'String de data e hora no formato ISO-8601',
        serialize: (value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value)
    }),

    Query: {
        users: (parent, args, { dataSources }) => dataSources.usersAPI.getUsers(),
        user: (parent, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id)
    }, 

    Mutation: {
        adicionaUser: (parent, user, { dataSources }) => dataSources.usersAPI.adicionaUser(user),
        atualizaUser: (parent, novosDados, { dataSources }) => dataSources.usersAPI.atualizaUser(novosDados),
        deletaUser: (parent, { id }, { dataSources }) => dataSources.usersAPI.deletaUser(id)
    }
};

module.exports = userResolvers;