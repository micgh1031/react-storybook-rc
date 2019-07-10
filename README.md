## React-Storybook-App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Besides Create React App boilerplate this project counts on the packages:

- classnames
- prop-types
- react-helmet
- react-router
- react-snapshot
- redux
- redux-form
- redux-thunk
- storybook
- postcss-cssnext

Refer to [Create React App](https://github.com/facebookincubator/create-react-app) for a complete README with recipes and how-tos.

## First run

Install yarn if needed with `npm i -g yarn`.
Run `yarn` on the root of the project to install dependencies.

## Translations

The translation files are located in `src/i18n`.

The file `en.json` contains the project's default English strings. Use it as the reference for other translation files.  
**Note:** Don't edit any string in this file because it gets overwritten when the strings are extracted from the project.

When strings are added, you should update other translation files with new terms from the default English file.  
We are using [POEditor](https://poeditor.com/) to make this process a little smoother.

Check Available Scripts section to learn how to extract strings from the project.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run translate`

Goes through all `.js` files in the `src` folder and extracts each component's translatable strings to a `.json` with the same name. Then it merges all these files into a single `en.json` located in `src/i18n/` to be used as a reference for translation. In the end, the source `.json` files are deleted.
