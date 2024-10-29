export default async function requestForm(event) {
    event.preventDefault();
    await fetch("./src/php/request.php", {
        method: "POST",
        body: new FormData(this),
    });

    location.assign('./src/php/pages/history.html');
}