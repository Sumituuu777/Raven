import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../context/authContext";
import { BlogContext } from "../../context/blogContext";
import { CommentContext } from "../../context/commentContext";
import assets from '../assets/assets';
const CommentsContainer = ({blogId}) => {
  const { authUser } = useContext(AuthContext);
  const { selectedBlogForComments, setSelectedBlogForComments,deleteComment,createComment,allComments,setAllComments, getComments} = useContext(CommentContext);
  const [text, setText] = useState("");

  useEffect(() => {
        getComments(blogId);
      }, []);
  const handleSubmit = () => {
    if (!text.trim()) return;

    createComment(
        { text },
        blogId
    );
    setText("");
  };

  return (
    <div className="space-y-4">
      {/* Add Comment */}
      <div className="flex gap-3 rounded-xl bg-gray-50 p-1 mx-4">
        {authUser?.profilePic ? (
            <img
          src={authUser?.profilePic || assets.avatar_icon}
          alt=""
          className="w-7 h-7 rounded-full object-cover shrink-0"
        />
        ):(
            <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-semibold text-[15px]">
                {authUser?.fullName
                ? authUser.fullName.charAt(0).toUpperCase()
                : "A"}
            </div>
        )}
        

        <div className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-1 text-sm outline-none focus:border-violet-500"
          />

          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="rounded-lg bg-violet-600 px-4 text-white hover:bg-violet-700 transition"
          >
            Post
          </button>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-3">
        {allComments.map((comment) => (
          <div
            key={comment._id}
            className="flex gap-3 rounded-xl  px-8"
          >
            {comment.user.profilePic ? (
                <img
              src={comment.user.profilePic || assets.avatar_icon}
              alt={comment.user.fullName}
              className="w-7 h-7 rounded-full object-cover shrink-0"
            />
            ):(
                <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-semibold text-[15px]">
                {comment.user?.fullName
                ? comment.user?.fullName.charAt(0).toUpperCase()
                : "A"}
            </div>
            )}
            

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {comment.user.fullName}
                </span>

                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>

              <p className=" text-sm text-gray-600 wrap-break-words whitespace-pre-wrap">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer
