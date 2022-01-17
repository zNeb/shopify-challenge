export default function getDate(days: number) {
  // Gets today's date and the day 20 days ago into a YYYY-MM-DD string
  const currentDate = new Date();
  const endDate = currentDate.toISOString().split('T')[0];
  // Add 1 day to days to account for the current day
  currentDate.setDate(currentDate.getDate() - Math.round(days + 1));
  const startDate = currentDate.toISOString().split('T')[0];
  return { startDate, endDate };
}
