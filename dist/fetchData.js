export default async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error("Erro" + response.status);
        const json = await response.json();
        return json;
    }
    catch (e) {
        if (e instanceof Error) {
            console.error("fetchData: " + e.message);
        }
        return null;
    }
}
//# sourceMappingURL=fetchData.js.map