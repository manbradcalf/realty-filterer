import unirest from "unirest";

/**
 * GET PROPERTY DETAIL
 **/
function getDetail(propertyId) {
  // Get property detail by property Id
  var req = unirest(
    "GET",
    "https://realtor.p.rapidapi.com/properties/v2/detail"
  );

  req.query({
    property_id: `${propertyId}`,
  });

  req.headers({
    "x-rapidapi-host": "realtor.p.rapidapi.com",
    "x-rapidapi-key": "3e2d08027fmshd6b370cbcb49540p1a9dabjsn558354752b05",
    useQueryString: true,
  });

  console.log("Calling get detail");
  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    var details = res.body.properties[0];
    const { schools, ...noSchools} = details;
    console.log(
      `response body for detail call is: \n\n ${JSON.stringify(noSchools)}`
    );
  });
}

function start() {
  let args = process.argv.slice(2);
  let address = args[0];
  // Get property Id for Address
  var req_ac = unirest(
    "GET",
    "https://realtor.p.rapidapi.com/locations/auto-complete"
  );

  req_ac.query({
    input: `${address}`,
  });

  req_ac.headers({
    "x-rapidapi-host": "realtor.p.rapidapi.com",
    "x-rapidapi-key": "3e2d08027fmshd6b370cbcb49540p1a9dabjsn558354752b05",
    useQueryString: true,
  });

  req_ac.end(function (res) {
    if (res.error) throw new Error(res.error);
    var id = res.body.autocomplete[0].mpr_id;
    console.log(`id is ${id}`);
    getDetail(id);
  });
}

start();
