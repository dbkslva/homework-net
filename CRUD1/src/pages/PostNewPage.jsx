import { useState } from "react";
import { useHistory } from "react-router-dom";

const API_URL = "http://localhost:7070";
const DRAFT_KEY = "crud_post_draft";

export default function PostNewPage() {
  const [content, setContent] = useState(() => {
    try {
      return localStorage.getItem(DRAFT_KEY) || "";
    } catch {
      return "";
    }
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handlePublish = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 0, content }),
    })
      .then(() => {
        try {
          localStorage.removeItem(DRAFT_KEY);
        } catch {}
        history.push("/");
      })
      .catch(() => setLoading(false));
  };

  const handleClose = () => {
    try {
      if (content.trim()) {
        localStorage.setItem(DRAFT_KEY, content);
      } else {
        localStorage.removeItem(DRAFT_KEY);
      }
    } catch {}
    history.push("/");
  };

  return (
    <div className="post-form-card">
      <button
        type="button"
        className="post-form-card__close"
        onClick={handleClose}
        aria-label="Закрыть"
      >
        ×
      </button>
      <h2 className="post-form-card__title">Новый пост</h2>
      <form onSubmit={handlePublish}>
        <div className="post-form-card__header">
          <div className="post-form-card__avatar" />
          <span className="post-form-card__author">Заглушка</span>
        </div>
        <textarea
          className="post-form-card__input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Введите текст поста..."
          rows={4}
          autoFocus
        />
        <button
          type="submit"
          className="post-form-card__submit"
          disabled={loading}
        >
          {loading ? "Публикация..." : "Опубликовать"}
        </button>
      </form>
    </div>
  );
}
