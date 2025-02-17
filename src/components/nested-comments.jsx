import {useState} from "react";
import useCommentTree from "../hooks/use-comment-tree";
import Comment from "./comment";
import "./styles.css";

const NestedComments = ({
  comments = [],
  onSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
   onUpvote = () => {},
  onDownvote = () => {},
}) => {
  const [comment, setComment] = useState("");

  const {
    comments: commentsData,
    insertComment,
    editComment,
    deleteComment,
    upvoteComment,
    downvoteComment,
    
  } = useCommentTree(comments);

  const handleReply = (commentId, content) => {
    insertComment(commentId, content);
    onSubmit(content);
  };

  const handleEdit = (commentId, content) => {
    editComment(commentId, content);
    onEdit(content);
  };

  const handleDelete = (commentId) => {
    deleteComment(commentId);
    onDelete(commentId);
  };

  const handleEditChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment) {
      handleReply(undefined, comment);
      setComment("");
    }
  };
  const handleUpvote = (commentId) => {
    upvoteComment(commentId);
  };
  
  const handleDownvote = (commentId) => {
    downvoteComment(commentId);
  };
  

  return (
    <>
      <div className="add-comment">
        <textarea
          value={comment}
          onChange={handleEditChange}
          rows={3}
          cols={50}
          className="comment-textarea"
          placeholder="Add a new comment..."
        />
        <button onClick={handleSubmit} className="comment-button">
          Add Comment
        </button>
      </div>

      {commentsData.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onSubmitComment={handleReply}
          onEditComment={handleEdit}
          onDeleteComment={handleDelete}
          onUpvoteComment={handleUpvote}
          onDownvoteComment={handleDownvote}
        />
      ))}
    </>
  );
};

export default NestedComments;