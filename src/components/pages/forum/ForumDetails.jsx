/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams ,useNavigate} from "react-router-dom";
import config from '/src/config';
import './détailForum.css';
import { BiSolidLike } from "react-icons/bi";
import { FaReply } from "react-icons/fa";

const ForumDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(null);
  const [formError, setFormError] = useState(null);
  const [replyDescription, setReplyDescription] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [visibleComments, setVisibleComments] = useState(3); 
  const isAuthenticated = localStorage.getItem("token");
  useEffect(() => {
    axios.get(`${config.apiBaseUrl}/forums/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(response => {
        setForum(response.data.forum);
        setComments(response.data.forum.commentaires);
      })
      .catch(error => {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("Erreur lors de la récupération des détails du forum");
        }
      });
  }, [id]);

 
  const handleCommentSubmit = (e) => {

    if (!isAuthenticated) {
      navigate('/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return;
    }
    e.preventDefault();
    axios.post(`${config.apiBaseUrl}/forums/${id}/commentaires`, 
      { description }, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then((response) => {
      setMessage(response.data.message);
      setDescription("");
      setComments(prevComments => [...prevComments, response.data.data]);
    })
    .catch((error) => {
      if (error.response) {
        setFormError(error.response.data.errors);
      } else {
        setFormError("Une erreur s'est produite lors de l'ajout du commentaire.");
      }
    });
  };

  // Fonction pour aimer un commentaire
  const handleLikeComment = (commentId) => {
    if (!isAuthenticated) {
      navigate('/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return;
    }
    axios.post(`${config.apiBaseUrl}/commentaires/${commentId}/like`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
        )
      );
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout du like", error);
    });
  };
  
  // Fonction pour soumettre une réponse
  const handleReplySubmit = (e, commentId) => {
    e.preventDefault();
    axios.post(`${config.apiBaseUrl}/commentaires/${commentId}/repondre`,
      { description: replyDescription, forum_id: id }, 
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    .then((response) => {
        setComments(prevComments => 
          prevComments.map(comment => 
            comment.id === commentId 
              ? { ...comment, replies: [...(comment.replies || []), response.data.data] } 
              : comment
          )
        );
        setReplyDescription("");
        setReplyToCommentId(null); 
      })
  };

  const loadMoreComments = () => {
    setVisibleComments(visibleComments + 3);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!forum) {
    return <div>Chargement...</div>;
  }

  // Fonction pour calculer le temps écoulé
  const timeSince = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    
    if (interval > 1) return interval + " ans";
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " mois";
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + " jours";
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + " heures";
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " minutes";
    return seconds + " secondes";
  };

  return (
    <div className="bannerForumDétail">
      <div className="forumdétail-container">
        <div className="détaileForum1">
          <div>
            <div className="forum-items">
              <div className="forum-header">
                <div className="forum-profile">
                  <img src={`${config.imageProfil}/${forum.user.profile}`} />
                  <p>{forum.user.name}</p>
                </div>
                <div>
                  <p className="forum-author">
                    <strong>{forum.user.name}</strong>
                  </p>
                  <p className="forum-time">il y a {timeSince(forum.created_at)}</p>
                </div>
              </div>
              <p className="forum-title">{forum.libelle}</p>
              <p className="forum-description">{forum.description}</p>
            </div>
          </div>
          <div className="détailForum">
            {message && <p className="success-message">{message}</p>}
            {formError && <p className="error-message">{formError.description}</p>}
            
            <form onSubmit={handleCommentSubmit}>
              <div>
                <textarea
                  id="description"
                  value={description}
                  placeholder="Tapez ici votre sage suggestion"
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit">Commenter</button>
            </form>
          </div>
        </div>
        <div>
          <h3>Commentaires :</h3>
          {comments.length > 0 ? (
            <div className="comment-scrollable">
              <ul className="listeCommentaire">
                {comments.slice(0, visibleComments).map((comment) => (
                  <li key={comment.id} className="comment-item">
                    <div>
                      <p>@{forum.user.name}</p>
                      <p>{comment.description}</p>
                      <button onClick={() => handleLikeComment(comment.id)}>
                        <BiSolidLike /> {comment.likes}
                      </button>
                      <button onClick={() => setReplyToCommentId(comment.id)}>
                        <FaReply />
                      </button>
                      {replyToCommentId === comment.id && (
                        <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                          <textarea
                            value={replyDescription}
                            onChange={(e) => setReplyDescription(e.target.value)}
                            required
                          ></textarea>
                          <br />
                          <button type="submit">Ajouter la réponse</button>
                        </form>
                      )}
                      {comment.replies && comment.replies.length > 0 && (
                        <ul>
                          {comment.replies.map((reply) => (
                            <li key={reply.id}>{reply.description}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {visibleComments < comments.length && (
                <button onClick={loadMoreComments}>Voir plus de commentaires</button>
              )}
            </div>
          ) : (
            <p>Aucun commentaire disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumDetails;
