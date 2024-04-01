
# page-extractor
![image](https://github.com/datfcknadam/page-extractor/blob/gh-pages/badges/coverage-jest%20coverage.svg)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)


Page-exctractor is function to retrieve data from page-like API, page by page until all data is retrieved.

:innocent: **Zero depends**

:sparkles: **Simple** 

🔥 **Fast**

## Getting Started
Install Page-exctractor using [npm](https://www.npmjs.com/package/jest)

```npm install page-exctractor```

Import module:
```js
const pageExctractor = require('page-exctractor');
```
or 
```js
import pageExctractor from 'page-exctractor';
```

Let`s getting started retrieve data from api (an example Steam API):
```js
// totalData will contain data from all pages
const totalData = await pageExctractor(
  // fetchFn will request data page by page until it reaches total
  // For example, if the page size is 100 and the data is 1000, then 10 queries will be executed.
  async (offset) => {
    const response = await fetch(
      `https://steamcommunity.com/market/search/render/?query=&start=${offset}count=100&appid=753&norender=1`,
    );
    const { results, total_count } = await response.json();
    return {
      data: results,
      total: total_count,
    };
  },
);
```

## Parameters
```ts
pageExctractor(fetchFn, [, options]);
```
Where

- **fetchFn** is callback function to retrieve data. It must return an object with the number of records (total) and data.  
- **options** is an optional options object
## Options
Possible option values

- **pageSize** single page size, defaults **100**
- **pageLimit** limit of pages, defaults **infinite**
- **totalLimit** limit on the total amount of data for all pages, defaults **infinite**
- **orderRequired** whether the data order is mandatory, defaults **false**
