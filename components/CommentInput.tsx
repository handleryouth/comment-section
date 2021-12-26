import Head from "next/head";
import Image from "next/image";
import { CommentInputProps } from "types";

export const CommentInput = ({
  toggleFunction,
  handlePostData,
}: CommentInputProps) => {
  return (
    <div className="flex items-start mt-8 mx-4 flex-col sm:flex-row">
      <Head>
        <title>Comment Section using mongoose</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Comment Section using mongoose" />
        <meta name="keywords" content="NextJS, Tailwind CSS, React, mongoose" />
        <meta httpEquiv="content-language" content="en-us" />
        <meta name="author" content="handleryouth" />
      </Head>

      <div className="flex w-full">
        <div className="mr-3 ">
          <Image
            src="/images/avatars/image-juliusomo.png"
            layout="fixed"
            width={40}
            height={40}
            alt="Profile Picture"
          />
        </div>

        <textarea
          style={{ resize: "none" }}
          className="bg-lightgray h-36 rounded-md p-4 w-full focus:outline-none focus:border-2 focus:border-grayishblue  "
          onChange={(e) => {
            toggleFunction(e.target.value);
          }}
          placeholder="Write a comment..."
        />
      </div>
      <button
        className="w-full bg-moderateblue text-white py-3 px-5 rounded tracking-widest mt-4 sm:ml-4 sm:w-auto sm:mt-0"
        onClick={() => handlePostData()}
      >
        REPLY
      </button>
    </div>
  );
};

export default CommentInput;
