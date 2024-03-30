import pageExtractor from '../src';
import pages from '../__mocks__/pages';
import api from '../__mocks__/api';

test('default offset fetch', async () => {
  const chunkSize = 10;
  const data = await pageExtractor<number, number>(
    (_, offset) => offset,
    (offset) => {
      const { data, total } = api(offset, chunkSize);
      return {
        data,
        total,
      };
    },
    {
      chunkSize,
    }
  );
  expect(data.length).toBe(pages.length)
});

test('chunk smaller then total', async () => {
  const chunkSize = 101;
  const data = await pageExtractor(
    (_, offset) => offset,
    (offset) => {
      const { data, total } = api(offset, chunkSize);
      return {
        data,
        total,
      };
    },
    {
      chunkSize,
    }
  );
  expect(data.length).toBe(pages.length)
});

test('order required', async () => {
  const chunkSize = 10;
  const data = await pageExtractor(
    (_, offset) => offset,
    (offset) => {
      const { data, total } = api(offset, chunkSize);
      return {
        data,
        total,
      };
    },
    {
      chunkSize,
      orderRequired: true,
    }
  );
  expect(data).toEqual(pages);
});

test('limit total', async () => {
  const chunkSize = 10;
  const data = await pageExtractor(
    (_, offset) => offset,
    (offset) => {
      const { data, total } = api(offset, chunkSize);
      return {
        data,
        total,
      };
    },
    {
      chunkSize,
      limitTotal: 10,
    }
  );
  expect(data).toEqual(pages.slice(0, chunkSize));
});

test('chunk total', async () => {
  const chunkSize = 10;
  const data = await pageExtractor(
    (_, offset) => offset,
    (offset) => {
      const { data, total } = api(offset, chunkSize);
      return {
        data,
        total,
      };
    },
    {
      chunkSize: 10,
      limitChunks: 2,
    }
  );
  expect(data).toEqual(pages.slice(0, chunkSize * 2));
});