export const getUserFromDb = async (email: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/users/${email}`, {
      method: "GET",
    });
    if (!response) {
      console.log("getUserFromDb - error while getting user from DB");
      return;
    }

    return response.json();
  } catch (err) {
    console.log("getUserFromDb - catch error", err);
  }
};
