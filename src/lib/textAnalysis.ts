const stopWords = new Set(
  "a an and are as at be been being but by can could did do does for from had has have he her here hers him his how i if in into is it its may me more most my no not of on one or our out she should so some than that the their them then there these they this those through to too under up us very was we were what when where which who will with would you your".split(" "),
);

const getWords = (text: string) =>
  text.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? [];

const getSentences = (text: string) =>
  (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [])
    .map((sentence) => sentence.trim())
    .filter(Boolean);

export interface TextAnalysis {
  summary: string;
  keyPoints: string[];
  topics: Array<{ term: string; count: number }>;
  stats: Array<{ label: string; value: string }>;
}

export function analyzeText(text: string): TextAnalysis {
  const normalizedText = text.trim();
  const words = getWords(normalizedText);
  const sentences = getSentences(normalizedText);
  const frequencies = new Map<string, number>();

  words.forEach((word) => {
    const term = word.toLocaleLowerCase();
    if (term.length > 2 && !stopWords.has(term)) {
      frequencies.set(term, (frequencies.get(term) ?? 0) + 1);
    }
  });

  const rankedSentences = sentences.map((sentence, index) => {
    const terms = getWords(sentence).map((word) => word.toLocaleLowerCase());
    const score =
      terms.reduce((total, term) => total + (frequencies.get(term) ?? 0), 0) /
        Math.max(terms.length, 1) +
      (index === 0 ? 0.15 : 0);

    return { sentence, index, score };
  });

  const selectedSentences = [...rankedSentences]
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(3, rankedSentences.length));
  const summary = selectedSentences
    .sort((a, b) => a.index - b.index)
    .map(({ sentence }) => sentence)
    .join(" ");
  const keyPoints = [...rankedSentences]
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(5, rankedSentences.length))
    .sort((a, b) => a.index - b.index)
    .map(({ sentence }) => sentence);
  const topics = [...frequencies.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([term, count]) => ({ term, count }));
  const paragraphCount = normalizedText.split(/\n+/).filter((part) => part.trim()).length;

  return {
    summary,
    keyPoints,
    topics,
    stats: [
      { label: "Words", value: words.length.toLocaleString() },
      { label: "Sentences", value: sentences.length.toLocaleString() },
      { label: "Paragraphs", value: paragraphCount.toLocaleString() },
      {
        label: "Average sentence length",
        value: `${sentences.length ? Math.round(words.length / sentences.length) : 0} words`,
      },
      {
        label: "Estimated reading time",
        value: `${Math.max(1, Math.ceil(words.length / 200))} min`,
      },
    ],
  };
}
