export const GLOBAL_SOURCES = [
  { id: 'bbc-news', name: 'BBC News', region: 'UK' },
  { id: 'cnn', name: 'CNN', region: 'US' },
  { id: 'reuters', name: 'Reuters', region: 'International' },
  { id: 'associated-press', name: 'AP', region: 'International' },
  { id: 'al-jazeera-english', name: 'Al Jazeera', region: 'Middle East' },
  { id: 'the-guardian-uk', name: 'The Guardian', region: 'UK' },
  { id: 'the-new-york-times', name: 'NY Times', region: 'US' },
  { id: 'abc-news', name: 'ABC News', region: 'US' },
  { id: 'bloomberg', name: 'Bloomberg', region: 'US' },
  { id: 'the-washington-post', name: 'Washington Post', region: 'US' },
  { id: 'nbc-news', name: 'NBC News', region: 'US' },
  { id: 'cbs-news', name: 'CBS News', region: 'US' },
  { id: 'fox-news', name: 'Fox News', region: 'US' },
  { id: 'espn', name: 'ESPN', region: 'US' },
  { id: 'wired', name: 'Wired', region: 'US' },
  { id: 'the-verge', name: 'The Verge', region: 'US' },
  { id: 'ars-technica', name: 'Ars Technica', region: 'US' },
  { id: 'time', name: 'Time', region: 'US' },
];

export const ALL_SOURCE_IDS = GLOBAL_SOURCES.map(s => s.id).join(',');

export const CATEGORIES = [
  { id: 'general', label: 'General' },
  { id: 'business', label: 'Business' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'health', label: 'Health' },
  { id: 'science', label: 'Science' },
  { id: 'sports', label: 'Sports' },
  { id: 'technology', label: 'Technology' },
];
