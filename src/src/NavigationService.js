import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}


const resetAndNavigate = (...screens) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: screens[0],
        params: {},
      }),
    ],
    key: null,
  });
  _navigator.dispatch(resetAction);

  for (let i = 1; i < screens.length; i += 1) {
    const navigateAction = NavigationActions.navigate({
      routeName: screens[i],
    });
    _navigator.dispatch(navigateAction);
  }
};


// add other navigation functions that you need and export them

export default {
  navigate,
  resetAndNavigate,
  setTopLevelNavigator,
};