export async function GET() {
  return Response.json({ success: false, error: "Invaild method" });
}

// Headers
const headers = {
  Host: "publicapi.txdpsscheduler.com",
  Connection: "keep-alive",
  "sec-ch-ua":
    "' Not A;Brand';v='99', 'Chromium';v='99', 'Google Chrome';v='99'",
  Accept: "application/json, text/plain, */*",
  "Content-Type": "application/json;charset=UTF-8",
  "sec-ch-ua-mobile": "?0",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36",
  "sec-ch-ua-platform": "macOS",
  Origin: "https://public.txdpsscheduler.com",
  "Sec-Fetch-Site": "same-site",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Dest": "empty",
  Referer: "https://public.txdpsscheduler.com/",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
};

export async function POST(req, res) {
  const { data, options } = await req.json();

  const loginPayload = {
    DateOfBirth: data.dateOfBirth,
    FirstName: data.firstName,
    LastName: data.lastName,
    LastFourDigitsSsn: data.last4ssn,
  };

  if (options.mode === "extAppoint") {
    try {
      // Login request
      const loginResponse = await fetch(
        "https://publicapi.txdpsscheduler.com/api/Eligibility",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(loginPayload),
        }
      );

      const loginData = await loginResponse.json();
      const responseId = loginData[0]?.ResponseId;

      if (responseId) {
        // Fetch appointments
        const bookingResponse = await fetch(
          "https://publicapi.txdpsscheduler.com/api/Booking",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(loginPayload),
          }
        );

        const appointments = await bookingResponse.json();
        if (appointments.length === 0) {
          return Response.json({
            success: true,
            data: "Login Successed: No existing appointment found.",
          });
        } else {
          return Response.json({
            success: true,
            data: `Login Successed: Existing appointment dates: ${appointments[0]?.BookingDateTime}`,
          });
        }
      } else {
        return Response.json({ success: false, data: "Login failed." });
      }
    } catch (error) {
      return Response.json({ success: false, data: `Login failed: ${error}` });
    }
  } else if (options.mode === "pincode") {
    try {
      // Login request
      const loginResponse = await fetch(
        "https://publicapi.txdpsscheduler.com/api/Eligibility",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(loginPayload),
        }
      );

      const d = {
        TypeId: 71,
        ZipCode: data.pincode,
        CityName: "",
        PreferredDay: "0",
      };

      const response = await fetch(
        "https://publicapi.txdpsscheduler.com/api/AvailableLocation",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(d),
        }
      );

      const locations = await response.json();
      return Response.json({ success: true, data: locations });
    } catch (error) {
      return Response.json({ success: false, data: `Login failed: ${error}` });
    }
  }
}
