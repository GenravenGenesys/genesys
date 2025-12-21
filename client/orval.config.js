module.exports = {
    dynastyApi: {
        input: 'http://localhost:8080/v3/api-docs',
        output: {
            mode: 'tags-split',
            target: 'src/api/generated',
            schemas: 'src/api/model',
            client: 'axios',
            mock: false,
            clean: true,
            prettier: true,
            override: {
                mutator: {
                    path: 'src/api/axios-instance.ts',
                    name: 'customInstance',
                },
            },
        },
    },
};