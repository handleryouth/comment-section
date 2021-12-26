export interface IndividualComment {
  _id?: string;
  profilePicture: string;
  username: string;
  comment: string;
  vote: number;
  replyTo?: string;
  date: string;
}

export interface Comments extends IndividualComment {
  reply?: IndividualComment[];
}

export interface CommentContainerProps extends Comments {
  handleUpdateVotes: Function;
  reply_id?: string;
}

export interface CommentInputProps {
  toggleFunction: (value: string) => void;
  handlePostData: Function;
  buttonText: string;
}
