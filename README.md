# Redux Fundamentals Workshop
Accompanies the Building Redux workshop slide deck.

## System Requirements
- [git](https://git-scm.com)
- [Node@^6.10.0](https://nodejs.org/en/)
- [yarn@^0.19.0](https://yarnpkg.com)
    - or npm@^3.0.0

## Setup
You will need to start by cloning this repo, then you'll run a simple `setup` script which will install all the dependencies and validate that you're ready to go. From your terminal, type:

```bash
git clone https://github.com/andrew-codes/jazzcon-2017-redux-workshop.git
cd jazzcon-2017-redux-workshop
yarn run setup
```

### Using `npm` instead of `yarn`
If you don't have `yarn` installed and don't want to use it for some reason, you can use [`npm`](https://www.npmjs.com) as well. Instead of `yarn run setup`, run `npm run setup` and enjoy waiting (and hopefully things don't break for you). When using npm, simply replace `yarn` with `npm` in the console commands below.

## Starting an Exercise
Exercises can be found in the `./exercises` directory and has an accompanying solution located in `./exercises-final`. Instructions for each exercise can be found in the exercise's `README.md` file; located in the root of the exercise directory. Exercises consist of a set of failing tests. These tests, combined with the slide deck, will guide you through the concepts and implementation.

## Running Exercise Tests
Run an exercises test by executing the following command in your console: `yarn test n` where `n` is the exercise number. So for example, running exercise 2, the command would be: `yarn test 2`.

**GOTCHA**: Do not prefix the exercise number with a "0". This is done for each exercise directory solely for the purpose of listing them in numerical order within your OS/IDE.

# Other
- [LICENSE](./docs/LICENSE.md)
