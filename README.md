# Advanced Task Planner

First Personal React Project - CURRENTLY IN WORK 👨🏼‍💻🔧!

The basic stuff - tasks can be:
- added
- edited
- checked off
- deleted 
- tasks are stored in local storage(LS)
- all tasks can be cleared with one button

More advanced features:
- tasks be sorted based on 4 options: newest, unchecked, importance and deadline
- tasks have optional importance level with dynamic badges(!, !! or !!!)
- tasks have optional deadline displayed with dynamic messages (backwards and forwards in time)
- progress-bar showing % of tasks completed
- auto-emojies can be toggled (certain words will append emoji to end of task text)
- settings in upper-right corner, where:
    - saving sort and auto emojies in LS can be toggled ON/OFF
    - progress bar can be turned ON/OFF
    - different theme (color and contrasts) options can be activated

Poential challenges for later
- add seach bar to search after todos? (with preditice search🤯?)
- remove local storage - try using database/backend and connect with API instead?
- implement typescript or next.js for SSR for certain parts(overkill?)


Key takeaways - react concepts:
- Reusable Modal component with dynamic size and button props
- Error boundary triggering different error messages
- Sort during changes (re-renders on each task change), no need to turn OFF and back ON
    - required big refactor: replaced index with key prop everywhere and stopped mutating 
      context array on sort, only use sort function on displaying tasks instead (hardest part!)
- Dynamic CSS styling (word-break vs break all)   


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
