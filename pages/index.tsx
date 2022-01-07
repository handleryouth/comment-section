import { useCallback } from "react";
import { useImmer } from "use-immer";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import mongoose from "mongoose";
import axios from "axios";
import type { NextPage } from "next";
import { Comments } from "types";
import { useRouter } from "next/router";
import { CommentContainer, CommentInput } from "components";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async () => {
  const responseData = await axios({
    method: "post",
    url: "https://data.mongodb-api.com/app/data-hdqqt/endpoint/data/beta/action/find",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.API_KEY!,
    },
    data: {
      collection: "comments",
      database: "comment-section",
      dataSource: "cluster-tutorial",
    },
  }).then((res) => {
    return res.data.documents;
  });

  return {
    props: { data: responseData },
  };
};

const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [allData, setAllData] = useImmer<Comments[]>(data && data);
  const router = useRouter();

  const [inputTemplate, setInputTemplate] = useImmer<
    Omit<Comments, "commentIndex" | "replyindex">
  >({
    profilePicture: "/images/avatars/image-juliusomo.png",
    username: "juliusomo",
    vote: 0,
    comment: "",
    reply: [],
    date: new Date().toString(),
  });

  const handlePostData = useCallback(() => {
    axios({
      method: "post",
      url: "/api/comment",
      data: {
        comment: inputTemplate.comment,
        profilePicture: inputTemplate.profilePicture,
        username: inputTemplate.username,
        reply: inputTemplate.reply,
        vote: inputTemplate.vote,
        date: inputTemplate.date,
      },
    })
      .then(() => {
        setInputTemplate((draft) => void (draft.comment = ""));
        router.reload();
      })
      .catch((err) => console.log(err.message));
  }, [
    inputTemplate.comment,
    inputTemplate.date,
    inputTemplate.profilePicture,
    inputTemplate.reply,
    inputTemplate.username,
    inputTemplate.vote,
    router,
    setInputTemplate,
  ]);

  const handleUpdateVotes = useCallback(
    (type: string, value: number, commentIndex: number, _id: string) => {
      let trueValue = type === "plus" ? value + 1 : value - 1;
      setAllData((draft) => {
        void (draft[commentIndex].vote! = trueValue);
      });
      axios({
        method: "post",
        url: "/api/vote/",
        data: {
          vote: trueValue,
          _id: new mongoose.Types.ObjectId(_id),
        },
      }).catch((err) => {
        console.log(err.message);
        setAllData((draft) => void (draft[commentIndex].vote = value));
      });
    },
    [setAllData]
  );

  const handleUpdateVotesReply = useCallback(
    (
      type: string,
      value: number,
      commentindex: number,
      _id: string,
      reply_id: string,
      replyindex: number
    ) => {
      let trueValue = type === "plus" ? value + 1 : value - 1;
      setAllData((draft) => {
        void (draft[commentindex].reply![replyindex].vote = trueValue);
      });
      axios({
        method: "post",
        url: "/api/replyvote/" + _id,
        data: {
          vote: trueValue,
          reply_id: reply_id,
        },
      }).catch((err) => {
        setAllData((draft) => {
          void (draft[commentindex].reply![replyindex].vote = value);
        });
        console.log(err.message);
      });
    },
    [setAllData]
  );

  return (
    <div className="p-4">
      <Head>
        <title>Comment Section using mongoose</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Comment Section using mongoose" />
        <meta name="keywords" content="NextJS, Tailwind CSS, React, mongoose" />
        <meta httpEquiv="content-language" content="en-us" />
        <meta name="author" content="handleryouth" />
      </Head>
      <div>
        {allData.map((comment, commentIndex) => {
          return (
            <div key={commentIndex}>
              <CommentContainer
                {...comment}
                handleUpdateVotes={handleUpdateVotes}
                commentIndex={commentIndex}
              />

              {comment.reply!.length > 0 && (
                <div className="ml-3 sm:ml-8 border-l-2">
                  {comment.reply!.map((reply, replyIndex) => {
                    return (
                      <CommentContainer
                        handleUpdateVotes={handleUpdateVotesReply}
                        key={replyIndex}
                        {...reply}
                        _id={comment._id}
                        reply_id={reply._id}
                        commentIndex={commentIndex}
                        replyindex={replyIndex}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <CommentInput
        toggleFunction={(value) =>
          setInputTemplate((draft) => void (draft.comment = value))
        }
        handlePostData={handlePostData}
        buttonText="REPLY"
      />
    </div>
  );
};

export default Home;
