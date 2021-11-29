This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## TV Maze Api Limitation for genre

tv maze api does not have any endpoint where you can pass genre and get results for specific genre

### Solution:

solution that i used is i fetch TV shows and the filter genre on the frontend side using following function

```
 function filterbyGenre(shows: tvShow[], genre: string) {
    const filteredShows = shows.filter((show: { genres?: string[] }) => {
      return show?.genres?.includes(genre);
    });
    setTvShows([...tvShows, ...filteredShows]); // destructuring because same function is being used by loadMore() when we reach end of scroll
  }
```

## Features Implemented

### Fetch TV Shows (/browse)

- [x] Fetch all tv shows by genre and display in horizontal scrollbar
- [x] data is paginated in scrollbar so once you reach end of horizontal
      scroll it loads data from the next page (i am proud of this one lol :heart: )
- [x] you can use arrows on left and right to move through tv items.
- [x] I have added a cool skeleton loading animation for this component
- [ ] I could have added empty state here to show no data was fetched but Nahh i didnt had time for it :disappointed:

### Search TV Shows (/search)

- [x] on input field focus user routes to search page and can add queries there
- [x] Yesss This page has empty state if no results found :simple_smile:
- [x] debounce function added on search to throttle multiple calls because a call is made to api
      on text Change

### View Show Details

- [x] on click of any Tv Show Card a nice popup opens that shows show details
      and previous episodes in a horizontal slider

## Project Demo Video

On Following link you can see [demo video](https://drive.google.com/file/d/14FiiuoLH-YXREtSsjJWWdpJSgORQyU7H/view?usp=sharing) of project.

### Why not Vue

during interview yes i was told to do it in Vue but i did it in react . I had to travel
to Pakistan due to some emergency so due to travelling and office work i had less time
to learn Vue and perform assignment in the same time . but yes i am open to learning this framework
in future. for now enjoy React :smile:
