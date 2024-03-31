# page-extractor
Page-exctractor is function to retrieve data from page-like API, page by page until all data is retrieved.

:innocent: **Zero depends**

:sparkles: **Simple** 

🔥 **Fast**

## Getting Started
Install Page-exctractor using [npm](https://www.npmjs.com/package/jest)

```npm install page-exctractor```

Let`s getting started fetch data from api (an example Steam API):
```js
await exctractPage(
  (offset) =>  offset,
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
