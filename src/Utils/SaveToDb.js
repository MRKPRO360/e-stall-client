export default async function SaveToDb(userInfo) {
  try {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    };

    const res = await fetch(
      "https://e-stall-server-mrkpro360.vercel.app/users",
      config
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
