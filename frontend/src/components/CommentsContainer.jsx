import React from 'react'
import { AuthContext } from "../../context/authContext";
import { BlogContext } from "../../context/blogContext";
import { CommentContext } from "../../context/commentContext";
const CommentsContainer = () => {
  const { authUser } = useContext(AuthContext);
  const { openComments, setOpenComments,deleteComment,createComment,allComments,setAllComments} = useContext(CommentContext);

  return (
    <div className="space-y-3">
      {allComments.map((comment) => (
        <div
          key={comment._id}
          className="flex gap-3 rounded-xl bg-gray-50 p-4"
        >
          {/* Profile Picture */}
          <img
            src={comment.user.profilePic}
            alt={comment.user.fullName}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />

          {/* Comment Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                {comment.user.fullName}
              </h3>

              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap wrap-break-words">
              {comment.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsContainer
