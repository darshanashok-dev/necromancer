const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  async analyze(repoUrl: string) {
    const response = await fetch(`${this.baseUrl}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repoUrl }),
    });
    return response.json();
  }

  async getAutopsy(id: string) {
    const response = await fetch(`${this.baseUrl}/api/analyze/${id}`);
    return response.json();
  }

  async revive(id: string) {
    const response = await fetch(`${this.baseUrl}/api/revive/${id}`, {
      method: 'POST',
    });
    return response.json();
  }

  async getRevival(id: string) {
    const response = await fetch(`${this.baseUrl}/api/revive/${id}`);
    return response.json();
  }

  async extract(id: string) {
    const response = await fetch(`${this.baseUrl}/api/extract/${id}`, {
      method: 'POST',
    });
    return response.json();
  }

  async getSoul(id: string) {
    const response = await fetch(`${this.baseUrl}/api/extract/${id}`);
    return response.json();
  }

  async reanimate(soulId: string, config: any) {
    const response = await fetch(`${this.baseUrl}/api/reanimate/${soulId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });
    return response.json();
  }

  async getResurrection(id: string) {
    const response = await fetch(`${this.baseUrl}/api/reanimate/${id}`);
    return response.json();
  }
}

export const apiClient = new ApiClient();
