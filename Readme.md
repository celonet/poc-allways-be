## Basic Configurations for run Allways

### Create default .env file:
```
NODE_ENV=development

PORT=3000

DB_URL=mongodb://localhost:27017/allways
DB_URL_TEST=mongodb://localhost:27017/allways-test
```

### To run the tests locally
```
npm run test
npm run test:coverage
```

### To run dev

```
npm run dev
```

### To test on Swaager 

<http://localhost:3000/api-docs>
