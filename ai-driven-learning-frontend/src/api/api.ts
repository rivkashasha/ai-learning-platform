import { API_BASE_URL } from "./config";

const api = {
  async getCategories() {
    const res = await fetch(`${API_BASE_URL}/Category`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },
  async getSubCategories(categoryName: string) {
    const res = await fetch(`${API_BASE_URL}/Category/${encodeURIComponent(categoryName)}/subcategories`);
    if (!res.ok) throw new Error("Failed to fetch subcategories");
    return res.json();
  },
  async submitPrompt(data: { customId: string; categoryName: string; subCategoryName: string; promptText: string }) {
    const res = await fetch(`${API_BASE_URL}/Prompt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async getUserHistory(customId: string) {
    const res = await fetch(`${API_BASE_URL}/Prompt/user/${encodeURIComponent(customId)}`);
    if (!res.ok) throw new Error("Failed to fetch user history");
    return res.json();
  },
  async getAllUsers() {
    const res = await fetch(`${API_BASE_URL}/User`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },
  async getAllPrompts() {
    const res = await fetch(`${API_BASE_URL}/Prompt`);
    if (!res.ok) throw new Error("Failed to fetch prompts");
    return res.json();
  },
  async registerUser(data: { customId: string; name: string; phone: string }) {
    const res = await fetch(`${API_BASE_URL}/User/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async getUserById(customId: string) {
    const res = await fetch(`${API_BASE_URL}/User/${encodeURIComponent(customId)}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }
};

export default api;
