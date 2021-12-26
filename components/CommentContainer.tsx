import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useImmer } from "use-immer";
import { useRouter } from "next/router";
import { CommentContainerProps, IndividualComment } from "types";
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
}: CommentContainerProps) => {
  const [reply, setReply] = useState(false);

  const [voteValidation, setVoteValidation] = useState<
    "plus" | "minus" | undefined
  >();

  const router = useRouter();

  useEffect(() => {}, []);

  const [replyTemplate, setReplyTemplate] = useImmer<IndividualComment>({
    profilePicture: "/images/avatars/image-juliusomo.png",
    username: "Julius Omo",
    comment: "",
    vote: 0,
    replyTo: "",
    date: new Date().toString(),
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
        router.push("/");
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

  return (
    <div>
      <div className="flex p-4 w-full items-center">
        <div className="bg-lightgrayishblue/25 mr-3 rounded overflow-hidden flex flex-col justify-center items-center">
          <button
            className={`w-10 h-2/6 ${
              voteValidation === "plus" && "bg-red-500"
            } `}
            onClick={() => {
              if (voteValidation === "plus") {
                handleUpdateVotes(vote - 1, _id, replyTo && reply_id);
                setVoteValidation(undefined);
              } else {
                handleUpdateVotes(vote + 1, _id, replyTo && reply_id);
                setVoteValidation("plus");
              }
            }}
          >
            +
          </button>
          <p className="text-center h-2/6">{vote}</p>
          <button
            className={`w-10 h-2/6 ${
              voteValidation === "minus" && "bg-red-500"
            } `}
            onClick={() => {
              if (voteValidation === "minus") {
                handleUpdateVotes(vote + 1, _id, replyTo && reply_id);
                setVoteValidation(undefined);
              } else {
                handleUpdateVotes(vote - 1, _id, replyTo && reply_id);
                setVoteValidation("minus");
              }
            }}
          >
            -
          </button>
        </div>

        <div className="w-full">
          <div
            className="flex justify-between flex-col sm:flex-row"
            onClick={() => setReply((prevState) => !prevState)}
          >
            <div className="flex  flex-row items-center">
              <Image
                src={profilePicture}
                layout="fixed"
                width={40}
                height={40}
                alt="Profile Picture"
              />

              <div className="ml-3">
                <p className=" text-darkblue font-bold">{username}</p>
                <p className="text-grayishblue">
                  {formatDistanceToNow(new Date(date), { addSuffix: true })}
                </p>
              </div>
            </div>

            <div
              className="flex items-center cursor-pointer my-1 sm:my-0"
              onClick={() => {
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
        />
      )}
    </div>
  );
};

export default CommentContainer;
