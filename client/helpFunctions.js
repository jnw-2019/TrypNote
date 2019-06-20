import dateFormat from 'dateformat';
import axios from 'axios';

// dateFormat(
//   entry.createdAt,
//   'dddd, mmmm dS, yyyy'

// const date = new Date();
//     date.setDate(date.getDate() + num);
//     return date;
// )}
// 86400000

export const filterEntries = (entries, entryFilter, userId) => {
  // const testDate = dateFormat(new Date(), 'dddd, mmmm dS, yyyy');
  // // console.log('testDate', testDate);
  // const date = new Date();
  // const beginningOfToday = date.setDate(date.getDate() - 1);
  // const endOfToday = beginningOfToday + 86400000;

  // const testAxios = axios
  //   .get(
  //     `api/entries/range/from/${beginningOfToday}/to/${endOfToday}/user/${userId}`
  //   )
  //   .then(res => res.data)
  //   .then(ent => ent);

  // console.log('test axios', testAxios);
  switch (entryFilter) {
    case 'today':
      return entries.slice(0, 1);
    // return entries.filter(entry =>
    //   dateFormat(
    //     entry.createdAt,
    //     'dddd, mmmm dS, yyyy' === dateFormat(currDate, 'dddd, mmmm dS, yyyy')
    //   )
    // );
    default:
      return entries;
  }
};
