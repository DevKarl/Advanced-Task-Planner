# React Task Planner

First Personal React Project - Task Planner App.

👉 [Click here for live demo](https://lambent-sprite-2d4ce8.netlify.app/)

The basic stuff - tasks can be:
- added
- edited
- checked off
- deleted 
- cleared(all) with one button 

The more 'advanced' features 🤔:
- user can add optional importance level with dynamic badges(!, !! or !!!) on tasks
- user can add optional deadline on tasks, which are displayed with dynamic messages 
- tasks are stored in local storage and handled with Context API
- sorting with 4 options: newest, unchecked, importance and deadline (top to bottom priority)
and the sorting is always live between editing, adding and deleting tasks.
- progress-bar showing % of tasks completed (checked off)
- auto-emojies can be toggled ON/OFF (certain words will cause emojies to append to the end of the tasks text)
- Hidden easter egg with animation 🙇‍♂️ 🎊 
- app-settings in upper-right corner (--> ⚙️ ) :
    - user can choose 9 different theme colors for the entire app
    - saving sort-option and saving auto-emojies between re-fresh can be toggled ON/OFF by the user

Key takeaways - react concepts:
- Reusable and dynamic modal components (various sizes, btn options etc. controlled by props)
- Error boundary for different scenarios
- Context API (prevents prop drilling!)
- Sorting is always live during changes (no mutation of tasks array state)
 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
