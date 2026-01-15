export interface Question {
  id: number;
  language: 'French';
  word: string;
  options: string[];
  correctAnswer: string;
}

export const questions: Question[] = [
  {
    id: 1,
    language: 'French',
    word: 'Bonjour',
    options: ['Goodbye', 'Hello', 'Thank you', 'Sorry'],
    correctAnswer: 'Hello',
  },
  {
    id: 2,
    language: 'French',
    word: 'Au revoir',
    options: ['Hello', 'Good evening', 'Good morning', 'Goodbye'],
    correctAnswer: 'Goodbye',
  },
  {
    id: 3,
    language: 'French',
    word: 'Merci',
    options: ['Please', "You're welcome", 'Thank you', 'Excuse me'],
    correctAnswer: 'Thank you',
  },
  {
    id: 4,
    language: 'French',
    word: 'Oui',
    options: ['Yes', 'No', 'Maybe', 'Always'],
    correctAnswer: 'Yes',
  },
  {
    id: 5,
    language: 'French',
    word: 'Non',
    options: ['Okay', 'Never', 'Why', 'No'],
    correctAnswer: 'No',
  },
  {
    id: 6,
    language: 'French',
    word: 'Homme',
    options: ['Woman', 'Man', 'Child', 'Person'],
    correctAnswer: 'Man',
  },
  {
    id: 7,
    language: 'French',
    word: 'Femme',
    options: ['Man', 'Girl', 'Woman', 'Boy'],
    correctAnswer: 'Woman',
  },
  {
    id: 8,
    language: 'French',
    word: 'Manger',
    options: ['To drink', 'To sleep', 'To eat', 'To run'],
    correctAnswer: 'To eat',
  },
  {
    id: 9,
    language: 'French',
    word: 'Eau',
    options: ['Fire', 'Water', 'Earth', 'Air'],
    correctAnswer: 'Water',
  },
  {
    id: 10,
    language: 'French',
    word: 'Chat',
    options: ['Dog', 'Bird', 'Fish', 'Cat'],
    correctAnswer: 'Cat',
  },
];
