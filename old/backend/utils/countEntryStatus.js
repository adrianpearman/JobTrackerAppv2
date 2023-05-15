// Count all the application response values
const countEntryStatus = (arr, recruiter) => {
  let appStatus0 = 0;
  let appStatus1 = 0;
  let appStatus2 = 0;
  let appStatus3 = 0;

  let recruiterStatus0 = 0;
  let recruiterStatus1 = 0;
  let recruiterStatus2 = 0;

  if (recruiter) {
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[i].recruiterLeadToInterview === true &&
        arr[i].recruiterLeadToRole === true
      ) {
        recruiterStatus2++;
      } else if (arr[i].recruiterLeadToInterview === true) {
        recruiterStatus1++;
      } else {
        recruiterStatus0++;
      }
    }

    return [
      {
        status: "Lead To No Interview/Role",
        applications: recruiterStatus0
      },
      {
        status: "Lead To Interview",
        applications: recruiterStatus1
      },
      {
        status: "Lead To Role",
        applications: recruiterStatus2
      }
    ];
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].response === 0) {
        appStatus0++;
      } else if (arr[i].response === 1) {
        appStatus1++;
      } else if (arr[i].response === 2) {
        appStatus2++;
      } else if (arr[i].response === 3) {
        appStatus3++;
      }
    }

    return [
      {
        status: "Not Viewed",
        applications: appStatus0
      },
      {
        status: "Application Viewed",
        applications: appStatus1
      },
      {
        status: "Application Declined",
        applications: appStatus2
      },
      {
        status: "Offer Provided",
        applications: appStatus3
      }
    ];
  }
};

module.exports = countEntryStatus;
