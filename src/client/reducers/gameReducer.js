import * as types from '../constants/actionTypes';

const initialState = {
  score: 0,
  questionNumber: 1,
  cards: [],
  wrongAnswers: ['wrong1', 'wrong2', 'wrong3'],
  answeredQuestions: [],
  selectedAnswer: '',
  ableToNext: false,
  nextClicked: false,
  gameLogo: '',
};

export default function (previousState = initialState, action) {
  let stateCopy;

  switch (action.type) {
    case types.POPULATE_CARDS_ARRAY: {
      stateCopy = Object.assign({}, previousState);
      stateCopy.cards = action.payload;
      console.log(' stateCopy.cards', stateCopy.cards);
      return stateCopy;
    }
    case types.SELECT_ANSWER: {
      stateCopy = Object.assign({}, previousState);
      if (stateCopy.selectedAnswer === '') {
        stateCopy.selectedAnswer = action.payload;
      }
      if (stateCopy.cards[0].card_name === stateCopy.selectedAnswer && !stateCopy.ableToNext) {
        stateCopy.score += 1;
      }
      stateCopy.ableToNext = true;
      return stateCopy;
    }
    case types.GO_TO_NEXT: {
      stateCopy = Object.assign({}, previousState);
      if (stateCopy.ableToNext === true) {
        const newAnsweredQuestions = stateCopy.answeredQuestions.slice();
        const newCards = stateCopy.cards.slice();
        newAnsweredQuestions.push(newCards.shift());
        stateCopy.answeredQuestions = newAnsweredQuestions;
        stateCopy.cards = newCards;
        stateCopy.questionNumber += 1;
        stateCopy.selectedAnswer = '';
      }
      stateCopy.ableToNext = false;
      return stateCopy;
    }
    // case types.SET_NEXT_CLICKED: {
    //   stateCopy = Object.assign({}, previousState);
    //   if (stateCopy.selectedAnswer !== '') {
    //     stateCopy.nextClicked = true;
    //   } else {
    //     stateCopy.nextClicked = false;
    //   }
    //   return stateCopy;
    // }

    default:
      return previousState;
  }
}
