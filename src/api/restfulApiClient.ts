import type { APIRequestContext, APIResponse } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev';

export class RestfulApiClient {
  constructor(private request: APIRequestContext) {}

  async getObject(id: string): Promise<APIResponse> {
    return this.request.get(`${BASE_URL}/objects/${id}`);
  }

  async getObjects(ids?: string[]): Promise<APIResponse> {
    const url = ids?.length
      ? `${BASE_URL}/objects?id=${ids.join(',')}`
      : `${BASE_URL}/objects`;
    return this.request.get(url);
  }

  async createObject(body: unknown): Promise<APIResponse> {
    return this.request.post(`${BASE_URL}/objects`, {
      data: body,
    });
  }

  async updateObject(id: string, body: unknown): Promise<APIResponse> {
    return this.request.put(`${BASE_URL}/objects/${id}`, {
      data: body,
    });
  }

  async deleteObject(id: string): Promise<APIResponse> {
    return this.request.delete(`${BASE_URL}/objects/${id}`);
  }
}
