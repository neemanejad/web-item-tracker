import { WebItemRequest, WebItemResponse } from './types';

export async function parseWebItems(
  url: string,
  items: WebItemRequest[],
): Promise<WebItemResponse[]> {
  return items.map(({ name, xpath }) => ({ name, value: `${xpath}'s value` }));
}
