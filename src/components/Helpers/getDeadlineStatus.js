

export default function getDeadlineStatus(deadline) {
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffDays = Math.round((deadlineDate - now) / ONE_DAY);
    const absoluteDiffDays = Math.abs(diffDays);
  
    if (diffDays === 0) {
      return "today";
    } else if (diffDays === 1) {
      return diffDays > 0 ? "tomorrow" : "yesterday";
    } else if (absoluteDiffDays < 14) {
      return `${absoluteDiffDays} day${absoluteDiffDays > 1 ? "s" : ""} ${diffDays > 0 ? "left" : "ago"}`;
    } else if (absoluteDiffDays < 60) {
      const weeks = Math.floor(absoluteDiffDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ${diffDays > 0 ? "left" : "ago"}`;
    } else if (absoluteDiffDays < 365) {
      const months = Math.floor(absoluteDiffDays / 30);
      return `${diffDays > 0 ? "" : ""} ${months} month${months > 1 ? "s" : ""} ${diffDays > 0 ? "left" : "ago"}`;
    } else {
      const years = Math.floor(absoluteDiffDays / 365);
      return `${diffDays > 0 ? "in" : ""} ${years} year${years > 1 ? "s" : ""} ${diffDays > 0 ? "" : "ago"}`;
    }
  }
  