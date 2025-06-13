import React, { useState } from "react";
import api from "../api/api";

const NewPrompt = ({ userId }: { userId: string }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [promptText, setPromptText] = useState("");
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    setLoading(true);
    api.getCategories()
      .then(setCategories)
      .catch((err) => setError(err.message || "Failed to load categories"))
      .finally(() => setLoading(false));
  }, []);

  React.useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      api.getSubCategories(selectedCategory)
        .then(setSubCategories)
        .catch((err) => setError(err.message || "Failed to load subcategories"))
        .finally(() => setLoading(false));
    } else {
      setSubCategories([]);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("");
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCategory(e.target.value);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedSubCategory || !promptText.trim()) return;
    setLesson(null);
    setError(null);
    setLoading(true);
    try {
      const result = await api.submitPrompt({
        customId: userId,
        categoryName: selectedCategory,
        subCategoryName: selectedSubCategory,
        promptText
      });
      setLesson(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>AI Lesson Generator</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>Category: </label>
          <select value={selectedCategory} onChange={handleCategoryChange} style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}>
            <option value="">Select Category</option>
            {categories && categories.map((cat: any) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>Subcategory: </label>
          <select value={selectedSubCategory} onChange={handleSubCategoryChange} disabled={!selectedCategory} style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}>
            <option value="">Select Subcategory</option>
            {subCategories && subCategories.map((sub: any) => (
              <option key={sub.id} value={sub.name}>{sub.name}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8 }}>Prompt: </label>
          <input
            type="text"
            value={promptText}
            onChange={handlePromptChange}
            placeholder="Teach me about black holes."
            style={{ width: '100%', padding: '0.5rem', borderRadius: 4, border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" disabled={loading || !selectedCategory || !selectedSubCategory || !promptText.trim()} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', cursor: 'pointer' }}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {lesson && (
        <div style={{ marginTop: 24 }}>
          <h3>Lesson:</h3>
          <div style={{ padding: 12, background: '#f3f6fa', borderRadius: 8 }}>
            {lesson.response}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPrompt;
