import React from 'react';
import IQQuiz from './containers/IQQuiz';
import ChoiceQuiz from './containers/ChoiceQuiz';
import NotFound from "./components/NotFound";
import UserContainer from "./containers/UserContainer";
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <UserContainer />
  },

  {
    path: "/IQQuiz",
    exact: true,
    main: () => <IQQuiz />
  },
  {
    path: "/IQQuiz/:number",
    exact: false,
    main: ({match}) => <IQQuiz match={match}/>
  },
  {
    path: "/ChoiceQuiz",
    exact: true,
    main: () =>  <ChoiceQuiz />
  },
  {
    path: "/ChoiceQuiz/:number",
    exact: false,
    main: ({match}) =>  <ChoiceQuiz match={match}/>
  },
  {
    path: null,
    exact: null,
    main: () => <NotFound />
  }
];
export default routes;