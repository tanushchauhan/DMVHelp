"use client";

import { useState } from "react";

function Page() {
  const [uiState, setUiState] = useState(2); // toggle UI state

  // States to give status to the user
  const [pincodesYet, setPincodesYet] = useState("None");
  const [pincodesDoing, setPincodesDoing] = useState("None");
  const [pincodesDone, setPincodesDone] = useState("None");

  // Main output state
  const [appointments, setAppointments] = useState([]);

  //Login Status
  const [loginStatus, setLoginStatus] = useState("Not Logged in");

  async function handleSubmit(e) {
    e.preventDefault();

    // information captured from the form
    const email = e.target.floating_email.value;
    const last4ssn = e.target.floating_last4ssn.value;
    const first_name = e.target.floating_first_name.value;
    const last_name = e.target.floating_last_name.value;
    const date = e.target.date.value;
    const pincodes = e.target.pincodes.value.split(",");
    const beforeDate = e.target.beforeDate.value; // this will act as a filter for the avaliable appointments

    // making date variable
    const beDate = new Date(beforeDate);

    console.log();

    const res = await fetch("/api/pincode", {
      method: "POST",
      body: JSON.stringify({
        options: { mode: "extAppoint" },
        data: {
          dateOfBirth: date,
          firstName: first_name,
          lastName: last_name,
          last4ssn,
        },
      }),
    });

    const logincheck = await res.json();

    if (!logincheck.success) return;

    setLoginStatus(logincheck.data);

    setUiState(2);

    let alDoneArr = [];

    for (let i = 0; i < pincodes.length; i++) {
      let pincodeYetString;
      if (i === pincodes.length - 1) pincodeYetString = "None";
      else {
        pincodeYetString = pincodes
          .slice(i + 1)
          .reduce((acc, e) => acc + ", " + e, "")
          .slice(2);
      }

      setPincodesYet(pincodeYetString);
      setPincodesDoing(pincodes[i]);

      let pincodesDoneString;
      if (i === 0) pincodesDoneString = "None";
      else {
        pincodesDoneString = pincodes
          .slice(0, i)
          .reduce((acc, e) => acc + ", " + e, "")
          .slice(2);
      }

      setPincodesDone(pincodesDoneString);

      const res = await fetch("/api/pincode", {
        method: "POST",
        body: JSON.stringify({
          options: { mode: "pincode" },
          data: {
            dateOfBirth: date,
            firstName: first_name,
            lastName: last_name,
            last4ssn,
            pincode: pincodes[i],
          },
        }),
      });

      const resData = await res.json();
      for (let w = 0; w < resData.data.length; w++) {
        const appDate = resData.data[w].NextAvailableDate.split("/");

        const appointDate = new Date(appDate[2], appDate[0] - 1, appDate[1]);

        if (appointDate < beDate) {
          if (!alDoneArr.includes(resData.data[w].Id)) {
            setAppointments((e) => {
              return [
                ...e,
                {
                  date: resData.data[w].NextAvailableDate,
                  place: resData.data[w].Name,
                  pincode: pincodes[i],
                },
              ];
            });

            alDoneArr.push(resData.data[w].Id);
          }
        }
      }
    }

    let finalString = pincodes.reduce((acc, e) => acc + ", " + e, "").slice(2);

    setPincodesYet("None");
    setPincodesDoing("None");
    setPincodesDone(finalString); // may need to handle some errors here in future
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center mt-28 mx-8 w-full md:max-w-lg">
        <div className="flex gap-10 items-center justify-center flex-col w-full">
          {uiState === 1 && (
            <div className="w-full">
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email address
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    name="floating_last4ssn"
                    id="floating_last4ssn"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_last4ssn"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Last Four Digits of SSN
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="date"
                    className="block mb-2 mt-8 text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Date of birth
                  </label>
                  <input
                    type="date"
                    className=" rounded-xl p-2 text-black"
                    name="date"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="beforeDate"
                    className="block mb-2 mt-8 text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Find appointments before this date
                  </label>
                  <input
                    type="date"
                    className=" rounded-xl p-2 text-black"
                    name="beforeDate"
                  />
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="floating_first_name"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      First name
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="floating_last_name"
                      id="floating_last_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_last_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Last name
                    </label>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="pincodes"
                    className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Enter in zipcodes (comma seprated)
                  </label>
                  <textarea
                    id="pincodes"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="eg. 75035,75033..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          )}
          {uiState === 2 && (
            <div className="w-full">
              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="pincodes"
                  className="block mb-2 mt-8 text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Login Status
                </label>
                <div className="flex items-center justify-center w-full">
                  <div
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 break-all mb-20"
                    readOnly
                  >
                    {loginStatus}
                  </div>
                </div>
                <label
                  htmlFor="pincodes"
                  className="block mb-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Pincodes yet to process
                </label>
                <div className="flex items-center justify-center w-full">
                  <div
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 break-all"
                    readOnly
                  >
                    {pincodesYet}
                  </div>
                </div>
                <label
                  htmlFor="pincodes"
                  className="block mb-2 mt-8 text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Pincode currently processing
                </label>
                <div className="flex items-center justify-center w-full">
                  <div
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 break-all"
                    readOnly
                  >
                    {pincodesDoing}
                  </div>
                </div>
                <label
                  htmlFor="pincodes"
                  className="block mb-2 mt-8 text-sm font-medium text-gray-500 dark:text-gray-400"
                >
                  Pincodes already processed
                </label>
                <div className="flex items-center justify-center w-full">
                  <div
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 break-all"
                    readOnly
                  >
                    {pincodesDone}
                  </div>
                </div>
              </div>
            </div>
          )}
          {uiState === 2 && (
            <div className="w-full">
              <label
                htmlFor="pincodes"
                className="block mb-2 mt-8 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                Avaliable appointments
              </label>
              <div>
                <div className="relative shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Place
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Pincode
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((e, i) => {
                        return (
                          <tr
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                            key={i}
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {e.place}
                            </th>
                            <td className="px-6 py-4">{e.date}</td>
                            <td className="px-6 py-4">{e.pincode}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {uiState === 2 && (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                setUiState(1);
                setAppointments([]);
              }}
            >
              {"< Back"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
