export const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };



export   function formatDateToSepDateYear(date) {
    // Create an array to store month names
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Get the year, month, and day from the input date
    const year = date?.getFullYear();
    const month = monthNames[date.getMonth()];
    const day = date?.getDate();
  
    // Format the date string
    const formattedDate = `${month} ${day}, ${year}`;
  
    return formattedDate;
  }
  


//  export function formatDateToMonthNameDayYear(inputDate) {
//     // Create an array to store month names
    // const monthNames = [
    //   "Jan", "Feb", "Mar", "Apr", "May", "June",
    //   "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    // ];
  
//     // Split the input date string into year, month, and day parts
//     const dateParts = inputDate?.split('-');
//     const year = dateParts[0];
//     const monthIndex = parseInt(dateParts[1]) - 1; // Subtract 1 because months are zero-based
//     const day = dateParts[2];
  
//     // Get the month name using the month index
//     const monthName = monthNames[monthIndex];
  
//     // Format the date string
//     const formattedDate = `${monthName} ${day}, ${year}`;
  
//     return formattedDate;
//   }


// export function formatDateToMonthNameDayYear(inputDate) {
//     // Create an array to store month names
//     const monthNames = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ];
  
//     // Split the input date string into year, month, and day parts
//     const dateParts = inputDate.split('-');
  
//     // Check if the dateParts array has the correct number of elements
//     if (dateParts.length === 3) {
//       const year = dateParts[0];
//       const monthIndex = parseInt(dateParts[1]) - 1; // Subtract 1 because months are zero-based
//       const day = dateParts[2];
  
//       // Get the month name using the month index
//       const monthName = monthNames[monthIndex];
  
//       // Format the date string
//       const formattedDate = `${monthName} ${day}, ${year}`;
  
//       return formattedDate;
//     } else {
//       // Handle invalid input date format
//       return "Invalid date format";
//     }
//   }
  
//   // Input date string in the "YYYY-MM-DD" format
//   const inputDateString = "1974-12-20";
  
//   // Format the input date using the custom function
//   const formattedDate = formatDateToMonthNameDayYear(inputDateString);
  
//   console.log(formattedDate); // Output: "December 20, 1974"
  



























export function formatDateToMonthNameDayYear(inputDate) {
    // Check if inputDate is a valid string
    if (typeof inputDate !== 'string') {
      return "Invalid  date";
    }
  
    // Create an array to store month names
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
  
    // Split the input date string into year, month, and day parts
    const dateParts = inputDate.split('-');
  
    // Check if dateParts has the correct number of elements
    if (dateParts.length === 3) {
      const year = dateParts[0];
      const monthIndex = parseInt(dateParts[1]) - 1; // Subtract 1 because months are zero-based
      const day = dateParts[2];
  
      // Get the month name using the month index
      const monthName = monthNames[monthIndex];
  
      // Format the date string
      const formattedDate = `${monthName} ${day}, ${year}`;
  
      return formattedDate;
    } else {
      // Handle invalid input date format
      return "Invalid date";
    }
  }
  

  