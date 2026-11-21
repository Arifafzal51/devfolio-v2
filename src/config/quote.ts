export interface QuoteType {
  quote: string;
  author: string;
  category?: "quran" | "hadith" | "wisdom" | "philosophy";
}

export const quotes: QuoteType[] = [
  // Holy Qur'an
  {
    quote:
      "Indeed, with hardship comes ease. Most certainly, with hardship comes ease.",
    author: "The Holy Qur'an (94:5-6)",
    category: "quran",
  },
  {
    quote: "Allah does not burden a soul beyond that it can bear.",
    author: "The Holy Qur'an (2:286)",
    category: "quran",
  },
  {
    quote:
      "And whoever relies upon Allah — then He is sufficient for him. Indeed, Allah will accomplish His purpose.",
    author: "The Holy Qur'an (65:3)",
    category: "quran",
  },
  {
    quote: "Verily, in the remembrance of Allah do hearts find rest.",
    author: "The Holy Qur'an (13:28)",
    category: "quran",
  },
  {
    quote:
      "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
    author: "The Holy Qur'an (2:152)",
    category: "quran",
  },
  {
    quote: "If you are grateful, I will surely increase you in favor.",
    author: "The Holy Qur'an (14:7)",
    category: "quran",
  },
  {
    quote:
      "And those who strive for Us — We will surely guide them to Our paths. And indeed, Allah is with the doers of good.",
    author: "The Holy Qur'an (29:69)",
    category: "quran",
  },
  {
    quote:
      "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.",
    author: "The Holy Qur'an (2:153)",
    category: "quran",
  },
  {
    quote:
      "When you have taken a decision, put your trust in Allah. Indeed, Allah loves those who rely upon Him.",
    author: "The Holy Qur'an (3:159)",
    category: "quran",
  },
  {
    quote:
      "Do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, He is the Forgiving, the Merciful.",
    author: "The Holy Qur'an (39:53)",
    category: "quran",
  },
  {
    quote:
      "Say, 'Each works according to his manner, but your Lord is most knowing of who is best guided in the way.'",
    author: "The Holy Qur'an (17:84)",
    category: "quran",
  },

  // Authentic Hadiths
  {
    quote:
      "Actions are judged by intentions, and every person will get the reward according to what he intended.",
    author: "Prophet Muhammad ﷺ (Sahih al-Bukhari 1)",
    category: "hadith",
  },
  {
    quote:
      "Tie your camel first, then put your trust in Allah.",
    author: "Prophet Muhammad ﷺ (Sunan at-Tirmidhi 2517)",
    category: "hadith",
  },
  {
    quote:
      "Verily, Allah loves that when any one of you does a job, he performs it with excellence and mastery (Ihsan).",
    author: "Prophet Muhammad ﷺ (Shu'ab al-Iman 4931)",
    category: "hadith",
  },
  {
    quote:
      "The strong believer is better and more beloved to Allah than the weak believer, while there is good in both. Strive for that which will benefit you, seek help from Allah, and do not lose heart.",
    author: "Prophet Muhammad ﷺ (Sahih Muslim 2664)",
    category: "hadith",
  },
  {
    quote:
      "Be mindful of Allah and He will protect you. Be mindful of Allah and you will find Him before you. If you ask, ask of Allah; if you seek help, seek help from Allah.",
    author: "Prophet Muhammad ﷺ (Sunan at-Tirmidhi 2516)",
    category: "hadith",
  },
  {
    quote:
      "None of you truly believes until he loves for his brother what he loves for himself.",
    author: "Prophet Muhammad ﷺ (Sahih al-Bukhari 13)",
    category: "hadith",
  },
  {
    quote:
      "Kindness is not found in anything except that it beautifies it, and it is not removed from anything except that it tarnishes it.",
    author: "Prophet Muhammad ﷺ (Sahih Muslim 2594)",
    category: "hadith",
  },
  {
    quote:
      "The strong person is not the one who can wrestle someone down. The strong person is the one who controls himself when he is angry.",
    author: "Prophet Muhammad ﷺ (Sahih al-Bukhari 6116)",
    category: "hadith",
  },
  {
    quote:
      "Take advantage of five before five: your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your preoccupation, and your life before your death.",
    author: "Prophet Muhammad ﷺ (Shu'ab al-Iman 9575)",
    category: "hadith",
  },
  {
    quote:
      "Seeking knowledge is an obligation upon every Muslim.",
    author: "Prophet Muhammad ﷺ (Sunan Ibn Majah 224)",
    category: "hadith",
  },
  {
    quote:
      "Part of the perfection of a person's faith is his leaving that which does not concern him.",
    author: "Prophet Muhammad ﷺ (Sunan at-Tirmidhi 2317)",
    category: "hadith",
  },
  {
    quote:
      "Charity does not decrease wealth, no one forgives another except that Allah increases his honor, and no one humbles himself for the sake of Allah except that Allah raises his status.",
    author: "Prophet Muhammad ﷺ (Sahih Muslim 2588)",
    category: "hadith",
  },

  // Wisdom & Philosophy
  {
    quote:
      "The first principle is that you must not fool yourself — and you are the easiest person to fool.",
    author: "Richard Feynman",
    category: "wisdom",
  },
  {
    quote: "A man who is master of patience is master of everything else.",
    author: "George Savile",
    category: "wisdom",
  },
  {
    quote: "First solve the problem, then write code.",
    author: "John Johnson",
    category: "wisdom",
  },
  {
    quote: "The best way to predict the future is to create it.",
    author: "Alan Kay",
    category: "wisdom",
  },
  {
    quote: "Arise, awake, and stop not till the goal is reached.",
    author: "Swami Vivekananda",
    category: "philosophy",
  },
  {
    quote:
      "The disciplined mind is your best friend. The undisciplined mind is your worst enemy.",
    author: "Bhagavad Gita",
    category: "philosophy",
  },
  {
    quote: "If it was easy, anyone could have done it.",
    author: "Unknown",
    category: "wisdom",
  },
];
