import { Comments } from "types";

export const mockComment: Omit<Comments, "commentIndex">[] = [
  {
    profilePicture: "/images/avatars/image-amyrobson.png",
    username: "amyrobson",
    comment:
      "Impressive! Though it seems the drag feature could be improved. But overtall it looks incredible. You've nailed the design and the res",
    vote: 12,
    reply: [],
    date: "Sat Dec 25 2021 23:01:08 GMT+0700 (Indochina Time)",
  },
  {
    profilePicture: "/images/avatars/image-maxblagun.png",
    username: "maxblagun",
    comment:
      "Woah, your project looks awesome! How long have you been coding for? I'm strill new, but i think i want to dive into React as well soon. Perhaps you can give me an insight on where i can learn React? Thanks!",
    vote: 5,
    date: "Sat Dec 25 2021 23:01:08 GMT+0700 (Indochina Time)",
    reply: [
      {
        profilePicture: "/images/avatars/image-ramsesmiron.png",
        username: "ramsesmiron",
        comment:
          "If you're still new. I'd recommend focusing on the fundamentals of HTML, CSS and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first",
        vote: 4,
        replyTo: "maxblagun",
        date: "Sat Dec 25 2021 23:01:08 GMT+0700 (Indochina Time)",
      },
      {
        profilePicture: "/images/avatars/image-juliusomo.png",
        username: "juliusomo",
        comment:
          "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest libary/framework. But the fundamentals are what stay constant",
        vote: 2,
        replyTo: "ramsesmiron",
        date: "Sat Dec 25 2021 23:01:08 GMT+0700 (Indochina Time)",
      },
    ],
  },
];
