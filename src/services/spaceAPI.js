const BASE_URL = "https://api.spacexdata.com/v5";

export const fetchLatestLaunch = async () => {
  const url = `${BASE_URL}/launches/latest`;
  console.log("Fetching latest launch:", url);
  
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch latest launch: ${res.status}`);
  return res.json();
};

export const fetchAllLaunches = async (limit = 30) => {
  const url = `${BASE_URL}/launches/query`;
  console.log("Fetching all launches:", url);
  
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: {},
      options: {
        sort: { date_unix: "desc" },
        limit,
        populate: [
          { path: "rocket", select: { name: 1 } },
          { path: "launchpad", select: { name: 1, locality: 1 } }
        ]
      }
    })
  });
  
  if (!res.ok) throw new Error(`Failed to fetch launches: ${res.status}`);
  return res.json();
};