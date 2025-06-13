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
  }
};

export default api;
