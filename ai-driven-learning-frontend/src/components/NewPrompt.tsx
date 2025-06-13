import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories, selectSubCategories, selectSelectedCategory, selectSelectedSubCategory, setSelectedCategory, setSelectedSubCategory, fetchCategories, fetchSubCategories } from "../redux/dashboardSlice";
import { submitPrompt, selectLesson, selectPromptLoading, selectPromptError, clearLesson } from "../redux/newPromptSlice";

const NewPrompt = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const subCategories = useSelector(selectSubCategories);
  const selectedCategory = useSelector(selectSelectedCategory);
  const selectedSubCategory = useSelector(selectSelectedSubCategory);
  const lesson = useSelector(selectLesson);
  const loading = useSelector(selectPromptLoading);
  const error = useSelector(selectPromptError);

  const [promptText, setPromptText] = useState("");

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  React.useEffect(() => {
    if (selectedCategory) dispatch(fetchSubCategories(selectedCategory));
  }, [dispatch, selectedCategory]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedCategory(e.target.value));
    dispatch(setSelectedSubCategory(""));
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedSubCategory(e.target.value));
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromptText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedSubCategory || !promptText.trim()) return;
    dispatch(clearLesson());
    dispatch(submitPrompt({
      customId: userId,
      categoryName: selectedCategory,
      subCategoryName: selectedSubCategory,
      promptText
    }));
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
