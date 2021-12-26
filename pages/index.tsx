import { useCallback } from "react";
import { useImmer } from "use-immer";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import mongoose from "mongoose";
import axios from "axios";
import type { NextPage } from "next";
import { Comments } from "types";
import { useRouter } from "next/router";
import { CommentContainer, CommentInput } from "components";

export const getServerSideProps: GetServerSideProps = async () => {
  const responseData = await axios({
    method: "post",
    url: "https://data.mongodb-api.com/app/data-hdqqt/endpoint/data/beta/action/find",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key":
        "nlRCkgQPOwz3e5PGlSpIsEoG8wnJCVJoVIinMpiH1m6xGNiuZr1yPrwAGdc6OH9b",
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
  const [inputTemplate, setInputTemplate] = useImmer<Comments>({
    profilePicture: "/images/avatars/image-juliusomo.png",
    username: "Julius Omo",
    vote: 0,
    comment: "",
    reply: [],
    date: new Date().toString(),
  });

  const router = useRouter();

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
        router.push("/");
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
    (value: number, _id: string) => {
      axios({
        method: "post",
        url: "/api/vote",
        data: {
          vote: value,
          _id: new mongoose.Types.ObjectId(_id),
        },
      })
        .then(() => {
          router.push("/");
        })
        .catch((err) => console.log(err.message));
    },
    [router]
  );

  const handleUpdateVotesReply = useCallback(
    (value: number, _id: string, reply_id: string) => {
      axios({
        method: "post",
        url: "/api/replyvote/" + _id,
        data: {
          vote: value,
          reply_id: reply_id,
        },
      })
        .then(() => {
          router.push("/");
        })
        .catch((err) => console.log(err.message));
    },
    [router]
  );

  return (
    <div>
      <div>
        {(data as Comments[]).map((comment, index) => {
          return (
            <div key={index}>
              <CommentContainer
                {...comment}
                handleUpdateVotes={handleUpdateVotes}
              />

              {comment.reply!.length > 0 && (
                <div className="ml-8 border-l-2">
                  {comment.reply!.map((reply, index) => {
                    return (
                      <CommentContainer
                        handleUpdateVotes={handleUpdateVotesReply}
                        key={index}
                        {...reply}
                        _id={comment._id}
                        reply_id={reply._id}
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
      />
    </div>
  );
};

export default Home;
