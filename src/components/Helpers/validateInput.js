
const validateInput = inputValue => {
    // Check if inputValue is a string and is not empty
    if (typeof inputValue !== 'string' || inputValue.trim() === '') {
      throw new Error('To-do cannot be empty 🙄 Please enter a valid to-do');
    }
    // Check if inputValue is not longer than 100 characters
    if (inputValue.length > 100) {
      throw new Error('To-do cannot be longer than 100 characters 😯 Please make it shorter');
    }
    // If all checks pass, return null(no error)
    return null;
  }
  
  export default validateInput;