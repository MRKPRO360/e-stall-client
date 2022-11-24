export default async function SaveToDb(userInfo) {
  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    };

    const res = await fetch("http://localhost:5000/users", config);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
