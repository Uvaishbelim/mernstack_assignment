export function validateURL(url){

    const regex =
        /^https:\/\/([\w-]+\.)+[\w-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

    return regex.test(url);

}