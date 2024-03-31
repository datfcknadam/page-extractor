import pageExtractor from '../src';
import pages from '../__mocks__/pages';
import api from '../__mocks__/api';

test('default offset fetch', async () => {
  const pageSize = 10;
  const data = await pageExtractor(
    (_, offset) => {
      const { data, total } = api(offset, pageSize);
      return {
        data,
        total,
      };
    },
    {
      pageSize,
    }
  );
  expect(data.length).toBe(pages.length)
});

test('chunk smaller then total', async () => {
  const pageSize = 101;
  const data = await pageExtractor(
    (_, offset) => {
      const { data, total } = api(offset, pageSize);
      return {
        data,
        total,
      };
    },
    {
      pageSize,
    }
  );
  expect(data.length).toBe(pages.length)
});

test('order required', async () => {
  const pageSize = 10;
  const data = await pageExtractor(
    (_, offset) => {
      const { data, total } = api(offset, pageSize);
      return {
        data,
        total,
      };
    },
    {
      pageSize,
      orderRequired: true,
    }
  );
  expect(data).toEqual(pages);
});

test('limit total', async () => {
  const pageSize = 10;
  const data = await pageExtractor(
    (_, offset) => {
      const { data, total } = api(offset, pageSize);
      return {
        data,
        total,
      };
    },
    {
      pageSize,
      totalLimit: 10,
    }
  );
  expect(data).toEqual(pages.slice(0, pageSize));
});

test('page limit', async () => {
  const pageSize = 10;
  const data = await pageExtractor(
    (_, offset) => {
      const { data, total } = api(offset, pageSize);
      return {
        data,
        total,
      };
    },
    {
      pageSize,
      pageLimit: 2,
    }
  );
  expect(data).toEqual(pages.slice(0, pageSize * 2));
});