export const getData = async (code) => {
    const api = `https://open.er-api.com/v6/latest/${code}`;
    const call = await fetch(api);
    const response = await call.json();
    return response;
}