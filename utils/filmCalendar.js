const createFilmCalendar = (year = new Date().getFullYear()) => {
  const timeZone = 'America/New_York';

  // Get week bounds (Friday to Thursday)
  function getWeekBounds(date) {
    const currentDate = new Date(date);

    // Get to Friday
    while (currentDate.getDay() !== 5) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    const startDate = new Date(currentDate);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + 6); // Add 6 days to get to Thursday

    return { start: startDate, end: endDate };
  }

  // Format date range
  function formatDateRange(startDate, endDate) {
    const options = {
      month: 'short',
      day: 'numeric',
      //timeZone: timeZone,
    };

    return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
  }

  // Check if date range includes current date
  function isCurrentWeek(startDate, endDate) {
    const now = new Date();
    //add current date with 00:00:00
    now.setHours(0, 0, 0, 0);
    return now >= startDate && now <= endDate;
  }

  // Get all weeks for the year
  function getAllWeeks() {
    const weeks = [];
    let currentDate = new Date(year, 0, 1); // Start with January 1st
    // currentDate = new Date(currentDate.toLocaleString('en-US', { timeZone }));

    // Get to the first Friday of the year
    while (currentDate.getDay() !== 5) {
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Generate weeks until we reach the next year
    while (currentDate.getFullYear() === year) {
      const weekBounds = getWeekBounds(currentDate);
      const isCurrentWeekValue = isCurrentWeek(weekBounds.start, weekBounds.end);
      weeks.push({
        weekNumber: weeks.length + 1,
        startDate: new Date(weekBounds.start),
        endDate: new Date(weekBounds.end),
        formattedRange: formatDateRange(weekBounds.start, weekBounds.end),
        isCurrentWeek: isCurrentWeekValue,
      });

      if (isCurrentWeekValue) break;
      // Move to next Friday
      currentDate.setDate(currentDate.getDate() + 7);
    }

    return weeks;
  }

  // Get week number for a date
  function getWeekNumber(date) {
    const weeks = getAllWeeks();
    return weeks.findIndex((week) => date >= week.startDate && date <= week.endDate) + 1;
  }

  // Get current film week
  function getCurrentWeek() {
    const now = new Date();
    const weekBounds = getWeekBounds(now);
    return {
      weekNumber: getWeekNumber(now),
      startDate: weekBounds.start,
      endDate: weekBounds.end,
      formattedRange: formatDateRange(weekBounds.start, weekBounds.end),
      isCurrentWeek: true,
    };
  }

  // Return public interface
  return {
    getAllWeeks,
    getCurrentWeek,
    getWeekNumber,
    getWeekBounds,
    formatDateRange,
    isCurrentWeek,
  };
};

export default createFilmCalendar;
