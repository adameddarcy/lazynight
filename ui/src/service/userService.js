export async function getUser() {

    try{
        const response = await fetch('/view/admin');
        return await response.json();
    }catch(error) {
        return [];
    }
}
