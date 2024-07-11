"use client";

import { useState } from "react";

function Page() {
  // Sample API call code

  // async function getData() {
  //   const res = await fetch("/api/pincode/", {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify({}),
  //   });

  //   const data = await res.json();

  //   setData(data);
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  const [uiState, setUiState] = useState(1); // toggle UI state

  // States to give status to the user
  const [pincodesYet, setPincodesYet] = useState("None");
  const [pincodesDoing, setPincodesDoing] = useState("None");
  const [pincodesDone, setPincodesDone] = useState("None");

  // Main output state
  const [appointments, setAppointments] = useState("None");

  function handleSubmit(e) {
    e.preventDefault();

    // information captured from the form
    const email = e.target.floating_email.value;
    const last4ssn = e.target.floating_last4ssn.value;
    const first_name = e.target.floating_first_name.value;
    const last_name = e.target.floating_last_name.value;
    const date = e.target.date.value;
    const pincodes = e.target.pincodes.value.split(",");
    const beforeDate = e.target.beforeDate.value; // this will act as a filter for the avaliable appointments

    // API requests here. One pincode at a time and then update the UI so, you should need some kind of for loop here to loop over pincodes

    setUiState(2);
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
              <div className="flex items-center justify-center w-full">
                <div
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 break-all"
                  readOnly
                >
                  {appointments}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
