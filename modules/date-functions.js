const { compareAsc } = require('date-fns');

const isDue = dueDate => {
  const currentDate = new Date();

  if (compareAsc(dueDate, currentDate) === -1 || compareAsc(dueDate, currentDate) === 0) {
    return true;
  }

  return false;
};

module.exports = { isDue };
