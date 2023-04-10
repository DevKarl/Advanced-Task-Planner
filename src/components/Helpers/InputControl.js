
export const validateInput = inputValue => {
    // Check if inputValue is empty
    if (inputValue.trim() === '') {
      throw new Error('Task cannot be empty 🙄 Please enter something!');
    }
    // Check if inputValue is not longer than 100 characters
    if (inputValue.length > 100) {
      throw new Error('Task cannot be longer than 100 characters 😯 Please make it shorter!');
    }
}

export const checkInputWordLength = taskText => {
  // Check if todoText has any words longer than 12 characters
  if (/\b\w{12,}\b/.test(taskText)) {
      return true;
  }
  return false;
}


export const isValidDeadline = deadline => {
  const minDate = '2023-01-01';
  const maxDate = '2099-12-31';
  if (deadline < minDate) {
    throw new Error('Invalid deadline. Date is too far back in time.');
  }

  if (deadline > maxDate) {
    throw new Error('Invalid deadline. Date is too far ahead in time.');
  }
}



