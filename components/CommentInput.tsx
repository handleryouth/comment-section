import Image from "next/image";

interface CommentInputProps {
  toggleFunction: (value: string) => void;
  handlePostData: Function;
}

export const CommentInput = ({
  toggleFunction,
  handlePostData,
}: CommentInputProps) => {
  return (
    <div className="flex items-start mt-8 mx-4">
      <div className="mr-3">
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

      <button
        className="ml-4 bg-moderateblue text-white py-3 px-5 rounded tracking-widest"
        onClick={() => handlePostData()}
      >
        REPLY
      </button>
    </div>
  );
};

export default CommentInput;
