import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../context/authContext";
import { BlogContext } from "../../context/blogContext";
import { CommentContext } from "../../context/commentContext";
import assets from '../assets/assets';
import { HiOutlineTrash } from 'react-icons/hi';
const CommentsContainer = ({ blogId }) => {
  const { authUser } = useContext(AuthContext);
  const { selectedBlogForComments, setSelectedBlogForComments, deleteComment, createComment, allComments, setAllComments, getComments } = useContext(CommentContext);
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
  const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const formatDate = date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).replace(' at ', ', ').toLowerCase();

    return formatDate;
  }
  return (
    <div className="space-y-4">
      {/* Add Comment */}
      <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-2 mx-3 sm:mx-4">
        {authUser?.profilePic ? (
          <img
            src={authUser.profilePic}
            alt=""
            className="w-8 h-8 rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-semibold text-[15px] shrink-0">
            {authUser?.fullName
              ? authUser.fullName.charAt(0).toUpperCase()
              : "A"}
          </div>
        )}

        <div className="flex flex-1 items-center gap-2 min-w-0">
          <input
            type="text"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 min-w-0 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500"
          />

          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="shrink-0 rounded-lg bg-violet-600 px-3 sm:px-4 py-2 text-sm text-white hover:bg-violet-700 transition disabled:bg-violet-300 disabled:cursor-not-allowed cursor-pointer"
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
            className="flex gap-3 rounded-xl px-4"
          >
            {comment.user.profilePic ? (
              <img
                src={comment.user.profilePic || assets.avatar_icon}
                alt={comment.user.fullName}
                className="w-7 h-7 rounded-full object-cover shrink-0"
              />
            ) : (
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
                  {formattedDate(comment.createdAt)}
                </span>
              </div>

              <p className=" text-sm text-gray-600 wrap-break-words whitespace-pre-wrap">
                {comment.text}
              </p>
            </div>
            {comment.user?._id?.toString() === authUser._id.toString() &&

              <button
                onClick={() => deleteComment(comment._id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
              >
                <HiOutlineTrash className="w-5 h-5" />
              </button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer
