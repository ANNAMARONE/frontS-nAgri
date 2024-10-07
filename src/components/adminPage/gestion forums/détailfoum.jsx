/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from '/src/config';
// import './src/pages/forum/détailForum.css';

const Forumdetails = () => {
  const { id } = useParams();
  const [forum, setForum] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(null);
  const [formError, setFormError] = useState(null);
  const [replyDescription, setReplyDescription] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);

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
    axios.post(`${config.apiBaseUrl}/commentaires/${commentId}/like`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(response => {
      console.log("Like ajouté", response.data);
      // Mettre à jour l'état des commentaires avec le nouveau nombre de likes
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
        )
      );
    })
    .catch(error => {
      console.error("Erreur lors de l'ajout du like", error);
      if (error.response) {
        // Afficher des messages d'erreur basés sur la réponse du serveur
        console.error("Erreur du serveur : ", error.response.data.message);
      } else {
        console.error("Erreur réseau : ", error.message);
      }
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
  

  if (error) {
    return <div>{error}</div>;
  }

  if (!forum) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h2>{forum.libelle}</h2>
      <p>{forum.description}</p>

      <h3>Commentaires :</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <div>
                <p>{comment.description}</p>
                <button onClick={() => handleLikeComment(comment.id)}>Aimer ({comment.likes})</button>
                <button onClick={() => setReplyToCommentId(comment.id)}>Répondre</button>
                {/* Formulaire de réponse */}
                {replyToCommentId === comment.id && (
                  <form onSubmit={(e) => handleReplySubmit(e, comment.id)}>
                    <textarea
                      value={replyDescription}
                      onChange={(e) => setReplyDescription(e.target.value)}
                      required
                    ></textarea>
                    <button type="submit">Ajouter la réponse</button>
                  </form>
                )}
                {/* Affichage des réponses */}
                {comment.replies && comment.replies.length > 0 && (
  <ul>
    {comment.replies.map(reply => (
      <li key={reply.id}>{reply.description}</li>
    ))}
  </ul>
)}

              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun commentaire disponible.</p>
      )}

      <h3>Ajouter un commentaire</h3>
      {message && <p className="success-message">{message}</p>}
      {formError && <p className="error-message">{formError.description}</p>}
      
      <form onSubmit={handleCommentSubmit}>
        <div>
          <label htmlFor="description">Commentaire :</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Ajouter le commentaire</button>
      </form>
    </div>
  );
};

export default Forumdetails ;
