# React + TypeScript + Vite

1. install 'vite'
2. `cd ecom`
3. `npm install`
4. `npm run dev`

Some notes:

- After adding card validation, I noticed that library throws some deprecated dependency warnings, due to tike limit I did not change the library
- Tried to implement pixel perfect approach, but some image/svgs from figma could have been exported with 1px error margin.
- Most of the css is in App.css, due to time restrictions I did move css to separate files, as not a lot of it was needed.
- Credit card selection radio input is mocked, with the same value everytime.
