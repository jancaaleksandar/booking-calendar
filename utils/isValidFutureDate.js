function isValidFutureDate(startDate) {
  const now = new Date();
  const checkDate = new Date(startDate);

  return checkDate > now && !isNaN(checkDate);
}

module.exports = isValidFutureDate;
