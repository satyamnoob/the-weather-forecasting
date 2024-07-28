export function getISTDatetime() {
  // Create a date object in UTC
  const date = new Date();
  
  // Calculate IST by adding 5 hours and 30 minutes to UTC
  const istTime = new Date(date.getTime() + (5 * 60 + 30) * 60000);
  
  // Format the time string
  const timeString = istTime.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'UTC',
  });
  
  // Format the date string
  const dateString = istTime.toISOString().split('T')[0];
  
  // Combine date and time
  return `${dateString} ${timeString}`;
}