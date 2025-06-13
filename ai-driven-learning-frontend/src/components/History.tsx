import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHistory, selectHistory, selectHistoryLoading, selectHistoryError } from "../redux/historySlice";

const History = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  const history = useSelector(selectHistory);
  const loading = useSelector(selectHistoryLoading);
  const error = useSelector(selectHistoryError);

  useEffect(() => {
    if (userId) dispatch(fetchUserHistory(userId));
  }, [dispatch, userId]);

  if (loading) return <div>Loading history...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Prompt History</h3>
      {(!history || history.length === 0) && <div>No history found.</div>}
      <ul>
        {history && history.map((item: any, idx: number) => (
          <li key={item.id || idx} style={{
            marginBottom: 12,
            padding: 8,
            background: '#f3f6fa',
            borderRadius: 8
          }}>
            <div><strong>Category:</strong> {item.categoryName || item.category_id}</div>
            <div><strong>Subcategory:</strong> {item.subCategoryName || item.sub_category_id}</div>
            <div><strong>Prompt:</strong> {item.promptText}</div>
            <div><strong>Response:</strong> {item.response}</div>
            <div><small>{item.createdAt}</small></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
