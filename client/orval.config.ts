export default {
    genesys: {
        input: {
            target: 'http://localhost:8080/v3/api-docs',
        },
        output: {
            client: 'react-query',
            target: './src/api/genesys.ts',
            schemas: './src/api/model',
            mode: 'tags-split',
        },
    },
};