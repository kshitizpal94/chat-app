export const baseURL = "http://localhost:5000/api";
export const PostRequest = async (url, body) => {
  // console.log(body);
  try {
    const response = await fetch(url, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) {
      return { error: true, errorMessage: data.err };
    }
    return data;
  } catch (err) {
    console.log('error in post',err);
  }
};

export const GetRequest = async (url) => {
  // console.log('GetRequest',url);
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return { error: true, errorMessage: data?.err || data?.message };
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};
