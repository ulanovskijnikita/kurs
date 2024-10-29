export default async function getData(query, url = './src/php/query.php') {
    const body = {
        "query": query
    }
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body)
    });

    if (response.ok) {
        return await response.json();
    } else {
        return JSON.stringify({"error": `Тут должны быть данные, но произошла ошибка при ответе: ${response.status}`});
    }
}