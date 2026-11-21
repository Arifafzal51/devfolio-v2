export type InstagramPost = {
  id: string;
  url: string;
  title: string;
  quote: string;
  subtext?: string;
  tag: string;
  type: "Reel" | "Post";
  date: string;
  likes?: number;
};

export const instagramConfig = {
  username: "arifafzal.in",
  profileUrl: "https://www.instagram.com/arifafzal.in/",
  handle: "@arifafzal.in",
  fullName: "ARIF AFZAL",
  badge: "Thoughts by Arif Afzal",
  bio: "Into scents, systems & building things • Fragrance × tech • Founder @essenceroyaleofficial",
  stats: {
    posts: "34+",
    followers: "310+",
    theme: "Philosophy & Depth",
  },

  // Handcrafted & curated posts directly from Arif's Instagram
  posts: [
    {
      id: "Df77A5vzA4X",
      url: "https://www.instagram.com/p/Df77A5vzA4X/",
      title: "Adult Bullying",
      quote: "Adult bullying is pure jealousy disguised as critique.",
      subtext: "Thoughts by Arif Afzal",
      tag: "Philosophy",
      type: "Reel",
      date: "Nov 19",
      likes: 5,
    },
    {
      id: "Df2oVwhTBJz",
      url: "https://www.instagram.com/p/Df2oVwhTBJz/",
      title: "Deserving Love",
      quote:
        "You can love someone despite all their flaws, yet somehow, you feel you have to be perfect to deserve their love.",
      subtext: "Inspired by Chhayank Tyagi • Thoughts by Arif Afzal",
      tag: "Vulnerability",
      type: "Post",
      date: "Nov 17",
      likes: 6,
    },
    {
      id: "DfkMMSFzTPx",
      url: "https://www.instagram.com/p/DfkMMSFzTPx/",
      title: "Understanding vs Agreement",
      quote:
        "People can disagree with you and still understand your point of view.",
      subtext: "Thoughts by Arif Afzal",
      tag: "Perspective",
      type: "Reel",
      date: "Nov 10",
      likes: 4,
    },
    {
      id: "DfaMjOHTFWv",
      url: "https://www.instagram.com/p/DfaMjOHTFWv/",
      title: "Connections & Fate",
      quote:
        "Some connections don't need perfect timing. They just keep finding their way back. Perhaps that's fate.",
      subtext: "Thoughts by Arif Afzal",
      tag: "Connections",
      type: "Reel",
      date: "Nov 6",
      likes: 10,
    },
    {
      id: "DfZkJfBzoK0",
      url: "https://www.instagram.com/p/DfZkJfBzoK0/",
      title: "Moral Principles",
      quote:
        "Would you rather be respected for obeying or disliked for standing by your principles?",
      subtext: "Thoughts by Arif Afzal",
      tag: "Integrity",
      type: "Reel",
      date: "Nov 6",
      likes: 1,
    },
    {
      id: "DfXcZ9wTXdb",
      url: "https://www.instagram.com/p/DfXcZ9wTXdb/",
      title: "A Free Soul",
      quote:
        "Have you ever met someone whose presence alone made you feel lighter, without them even trying?",
      subtext: "Thoughts by Arif Afzal",
      tag: "Presence",
      type: "Reel",
      date: "Nov 5",
      likes: 8,
    },
    {
      id: "DfrWN6yTTTO",
      url: "https://www.instagram.com/p/DfrWN6yTTTO/",
      title: "The Human Soul",
      quote:
        "The soul breathes in quiet moments of honest contemplation and genuine peace.",
      subtext: "Thoughts by Arif Afzal",
      tag: "Depth",
      type: "Reel",
      date: "Nov 13",
      likes: 31,
    },
    {
      id: "Df5L41IzQg5",
      url: "https://www.instagram.com/p/Df5L41IzQg5/",
      title: "Feel A Lot",
      quote:
        "Feeling deeply isn't a flaw in a noisy world — it's the quiet superpower of true creators.",
      subtext: "Thoughts by Arif Afzal",
      tag: "Reflection",
      type: "Reel",
      date: "Nov 18",
      likes: 3,
    },
  ] as InstagramPost[],

  section: {
    heading: "Thoughts & Quotes",
    subheading: "A glimpse of what I write and share on Instagram",
    cta: "Follow on Instagram",
  },
};
