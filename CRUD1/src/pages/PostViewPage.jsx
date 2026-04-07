import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:7070";

export default function PostViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const p = data.post;
        if (p) {
          setPost(p);
          setEditContent(p.content);
        } else {
          setError("Пост не найден");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (deleting) return;
    setDeleting(true);
    fetch(`${API_URL}/posts/${id}`, { method: "DELETE" }).then(() => {
      navigate("/");
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (saving || !post) return;

    setSaving(true);
    fetch(`${API_URL}/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post.id, content: editContent }),
    })
      .then(() => {
        setPost({ ...post, content: editContent });
        setIsEditing(false);
        setSaving(false);
      })
      .catch(() => setSaving(false));
  };

  const handleCloseEdit = () => {
    setEditContent(post?.content ?? "");
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="post-view">
        <div className="post-view__loading">Загрузка...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="post-view">
        <div className="post-view__error">{error || "Пост не найден"}</div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="post-form-card">
        <button
          type="button"
          className="post-form-card__close"
          onClick={handleCloseEdit}
          aria-label="Закрыть"
        >
          ×
        </button>
        <h2 className="post-form-card__title">Редактирование</h2>
        <form onSubmit={handleSave}>
          <div className="post-form-card__header">
            <div className="post-form-card__avatar" />
            <span className="post-form-card__author">Заглушка</span>
          </div>
          <textarea
            className="post-form-card__input"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={4}
            autoFocus
          />
          <button
            type="submit"
            className="post-form-card__submit"
            disabled={saving}
          >
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="post-view-card">
      <div className="post-view-card__header">
        <div className="post-view-card__avatar" />
        <span className="post-view-card__author">Заглушка</span>
      </div>
      <p className="post-view-card__content">{post.content}</p>
      <time className="post-view-card__date">
        {new Date(post.created).toLocaleString("ru-RU")}
      </time>
      <div className="post-view-card__actions">
        <button
          type="button"
          className="post-view-card__btn post-view-card__btn--edit"
          onClick={() => setIsEditing(true)}
        >
          Редактировать
        </button>
        <button
          type="button"
          className="post-view-card__btn post-view-card__btn--delete"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Удаление..." : "Удалить"}
        </button>
      </div>
    </div>
  );
}
