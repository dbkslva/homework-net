import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:7070";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="post-list">
        <div className="post-list__loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="post-list">
        <div className="post-list__error">Ошибка: {error}</div>
      </div>
    );
  }

  return (
    <div className="post-list">
      <div className="post-list__header">
        <h1 className="post-list__title">Посты</h1>
        <Link to="/posts/new" className="post-list__create-btn">
          Создать пост
        </Link>
      </div>
      <div className="post-list__cards">
        {posts.map((post) => (
          <div
            key={post.id}
            className="post-card post-card--clickable"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <div className="post-card__header">
              <div className="post-card__avatar" />
              <span className="post-card__author">Заглушка</span>
            </div>
            <p className="post-card__content">{post.content}</p>
            <time className="post-card__date">
              {new Date(post.created).toLocaleString("ru-RU")}
            </time>
          </div>
        ))}
      </div>
    </div>
  );
}
