import pages from './pages';

export default function api (offset: number, total: number) {  
  return {
    data: pages.slice(offset, offset + total),
    total: pages.length,
  }
}
