export const getTableData = async () => {
    const res = await fetch('https://table-server-eta.vercel.app/table');
    const jsonResponse = await res.json();
    return jsonResponse;
};