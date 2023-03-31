
const validateInput = inputValue => {
    // Check if inputValue is a string and is not empty
    if (typeof inputValue !== 'string' || inputValue.trim() === '') {
      throw new Error('Task cannot be empty 🙄 Please enter a valid task');
    }
    // Check if inputValue is not longer than 100 characters
    if (inputValue.length > 100) {
      throw new Error('Task cannot be longer than 100 characters 😯 Please make it shorter');
    }
    // If all checks pass, return null(no error)
    return null;
  }
  
  export default validateInput;