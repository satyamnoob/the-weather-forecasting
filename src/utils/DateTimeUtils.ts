const date = new Date();

export function getISTDatetime() {
    const istTime = date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
      timeZone: 'UTC',
    });
  
    const isoDateString = new Date().toISOString();
    const istDate = isoDateString.split('T')[0].concat(' ', istTime);
    return istDate;
  }