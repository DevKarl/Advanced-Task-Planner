# Advanced Task Planner

First Personal React Project - Task planner app

👉 [Click here for live demo](https://lambent-sprite-2d4ce8.netlify.app/)

The basic stuff - tasks can be:
- added
- edited
- checked off
- deleted 
- cleared(all) with one button 

More advanced features:
- user can add optional importance level with dynamic badges(!, !! or !!!) on tasks
- user can add optional deadline on tasks, which are displayed with dynamic messages 
- tasks stored in local storage(LS)
- sorting can be turned on based on 4 options: newest, unchecked, importance and deadline (top to bottom)
- progress-bar showing % of tasks completed (checked off)
- auto-emojies can be toggled ON/OFF (certain words will append emojies to end of the task text)
- confetti animation easter egg! 🙇‍♂️ add at least 3 tasks, and check them off 🎊
- settings in upper-right corner, where:
    - user can choose 9 different theme colors
    - saving sort and saving auto emojies in LS can be toggled ON/OFF
    - progress bar can be turned ON/OFF

Key takeaways - react concepts:
- Reusable Modal component with dynamic size and button props
- Error boundary triggering different error messages
- Context API (no prop drilling)
- Sort is always live once turned ON, will sort when any change is done during changes (no need to turn OFF and back ON)  



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
