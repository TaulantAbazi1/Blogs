import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const {
    data: blog,
    error,
    isPending,
  } = useFetch("http://localhost:8000/blogs/" + id);
  const history = useHistory();
  const [deletedMessage, setDeletedMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    fetch("http://localhost:8000/blogs/" + id, {
      method: "DELETE",
    })
      .then(() => {
        setDeletedMessage("Blog deleted!");
        setTimeout(() => {
          history.push("/");
        }, 1000);
      })
      .catch((err) => console.log("Error deleting blog", err));
  };

  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>

          {!showConfirm && (
            <button onClick={() => setShowConfirm(true)}>Delete</button>
          )}

          {showConfirm && (
            <div className="confirm-delete">
              <p>Are you sure you want to delete this blog?</p>
              <button onClick={handleClick}>Yes</button>
              <button onClick={() => setShowConfirm(false)}>No</button>
            </div>
          )}

          {deletedMessage && (
            <div className="deleted-message">{deletedMessage}</div>
          )}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
