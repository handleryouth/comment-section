import { useCallback, useState } from "react";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useImmer } from "use-immer";
import { CommentContainerProps, IndividualComment } from "types";
import Image from "next/image";
import { useRouter } from "next/router";
import CommentInput from "./CommentInput";

const CommentContainer = ({
  profilePicture,
  username,
  vote,
  comment,
  replyTo,
  _id,
  handleUpdateVotes,
  reply_id,
  date,
  commentIndex,
  replyindex,
}: CommentContainerProps) => {
  const [reply, setReply] = useState(false);
  const [edit, setEdit] = useState(false);

  const [voteValidation, setVoteValidation] = useState<
    "plus" | "minus" | undefined
  >();

  const router = useRouter();

  const [replyTemplate, setReplyTemplate] = useImmer<IndividualComment>({
    profilePicture: "/images/avatars/image-juliusomo.png",
    username: "juliusomo",
    comment: "",
    vote: 0,
    replyTo: "",
    date: new Date().toString(),
  });

  const [editTemplate, setEditTemplate] = useImmer<IndividualComment>({
    profilePicture: "/images/avatars/image-juliusomo.png",
    username: "juliusomo",
    comment: "",
    vote: vote,
    replyTo: replyTo,
    date: date,
  });

  const handleReplyComment = useCallback(() => {
    axios({
      method: "post",
      url: "/api/reply/" + _id,
      data: {
        replyTo: replyTemplate.replyTo,
        profilePicture: replyTemplate.profilePicture,
        username: replyTemplate.username,
        comment: replyTemplate.comment,
        vote: replyTemplate.vote,
        date: replyTemplate.date,
      },
    })
      .then(() => {
        router.reload();
        setReply(false);
      })
      .catch((err) => console.log(err.message));
  }, [
    _id,
    replyTemplate.comment,
    replyTemplate.date,
    replyTemplate.profilePicture,
    replyTemplate.replyTo,
    replyTemplate.username,
    replyTemplate.vote,
    router,
  ]);

  const handleDeleteReply = useCallback(() => {
    replyTo
      ? axios({
          method: "delete",
          url: "/api/reply/" + _id,
          data: {
            reply_id: reply_id,
          },
        })
          .then(() => {
            router.reload();
          })
          .catch((err) => console.log(err.message))
      : axios({
          method: "delete",
          url: "/api/comment",
          data: {
            _id: _id,
          },
        })
          .then(() => {
            router.reload();
          })
          .catch((err) => console.log(err.message));
  }, [_id, replyTo, reply_id, router]);

  const handleEditReply = useCallback(() => {
    replyTo
      ? axios({
          method: "patch",
          url: "/api/reply/" + _id,
          data: {
            reply_id: reply_id,
            comment: editTemplate.comment,
          },
        })
          .then(() => {
            setEdit(false);
            router.reload();
          })
          .catch((err) => console.log(err.message))
      : axios({
          method: "patch",
          url: "/api/comment",
          data: {
            _id: _id,
            comment: editTemplate.comment,
          },
        })
          .then(() => {
            setEdit(false);
            router.reload();
          })
          .catch((err) => console.log(err.message));
  }, [_id, editTemplate.comment, replyTo, reply_id, router]);

  return (
    <div>
      <div className="flex p-4 w-full items-center">
        <div className="bg-lightgrayishblue/25 mr-3 rounded overflow-hidden flex flex-col justify-center items-center">
          <button
            className={`w-10 h-2/6 `}
            onClick={() => {
              if (voteValidation === "plus") {
                handleUpdateVotes(
                  "minus",
                  vote,
                  commentIndex,
                  _id,
                  replyTo && reply_id,
                  replyindex && replyindex
                );
                setVoteValidation(undefined);
              } else {
                handleUpdateVotes(
                  "plus",
                  vote,
                  commentIndex,
                  _id,
                  replyTo && reply_id,
                  replyindex && replyindex
                );
                setVoteValidation("plus");
              }
            }}
          >
            +
          </button>
          <p className="text-center h-2/6">{vote}</p>
          <button
            className={`w-10 h-2/6  `}
            onClick={() => {
              if (voteValidation === "minus") {
                handleUpdateVotes(
                  "plus",
                  vote,
                  commentIndex,
                  _id,
                  replyTo && reply_id,
                  replyindex && replyindex
                );
                setVoteValidation(undefined);
              } else {
                handleUpdateVotes(
                  "minus",
                  vote,
                  commentIndex,
                  _id,
                  replyTo && reply_id,
                  replyindex && replyindex
                );
                setVoteValidation("minus");
              }
            }}
          >
            -
          </button>
        </div>

        <div className="w-full">
          <div className="flex justify-between flex-col sm:flex-row">
            <div className="flex  flex-row items-center">
              <Image
                src={profilePicture}
                layout="fixed"
                width={40}
                height={40}
                alt="Profile Picture"
              />

              <div className="ml-3">
                <div className="flex">
                  <p className=" text-darkblue font-bold">{username}</p>
                  {username === "juliusomo" && (
                    <p className="bg-moderateblue text-white px-1 ml-2 rounded">
                      You
                    </p>
                  )}
                </div>

                <p className="text-grayishblue">
                  {formatDistanceToNow(new Date(date), { addSuffix: true })}
                </p>
              </div>
            </div>

            {username !== "juliusomo" ? (
              <div
                className="flex items-center cursor-pointer my-1 sm:my-0"
                onClick={() => {
                  setReply((prevState) => !prevState);
                  setReplyTemplate!((draft) => void (draft.replyTo = username));
                }}
              >
                <Image
                  src="/images/icon-reply.svg"
                  layout="fixed"
                  width={20}
                  height={20}
                  alt="Reply Icon"
                />
                <p className="text-moderateblue ml-2 ">Reply</p>
              </div>
            ) : (
              <div className="flex items-center cursor-pointer my-1 sm:my-0">
                <div
                  className="flex items-center"
                  onClick={() => handleDeleteReply()}
                >
                  <Image
                    src="/images/icon-delete.svg"
                    layout="fixed"
                    width={20}
                    height={20}
                    alt="Reply Icon"
                  />
                  <p className="text-red-600 ml-2 ">Delete</p>
                </div>

                <div
                  className="flex items-center ml-4"
                  onClick={() => setEdit((prevState) => !prevState)}
                >
                  <Image
                    src="/images/icon-reply.svg"
                    layout="fixed"
                    width={20}
                    height={20}
                    alt="Reply Icon"
                  />
                  <p className="text-moderateblue ml-2 ">Edit</p>
                </div>
              </div>
            )}
          </div>

          <p className="text-grayishblue text-justify">
            {replyTo && (
              <span className="text-moderateblue  font-bold mr-2">{`@${replyTo}`}</span>
            )}
            {comment}
          </p>
        </div>
      </div>

      {reply && (
        <CommentInput
          toggleFunction={(value) =>
            setReplyTemplate!((draft) => void (draft.comment = value))
          }
          handlePostData={handleReplyComment}
          buttonText="REPLY"
        />
      )}

      {edit && (
        <CommentInput
          toggleFunction={(value) =>
            setEditTemplate!((draft) => void (draft.comment = value))
          }
          handlePostData={handleEditReply}
          buttonText="EDIT"
        />
      )}
    </div>
  );
};

export default CommentContainer;
