const API_URL = "https://apimusic.predelli.site"

function get_template_form(meth, form_data) {
    return {
        method: meth,
        credentiala: "include",
        body: form_data
    }
}

async function api_request(route, method, form_data) {
    const API_ROUTE = API_URL + "/" + route;
    try {
        const response = await fetch(API_ROUTE, get_template_form(method, form_data));
        if (!response.ok) {
            throw new Error("Response status :" + response.status);
        }

        const result = await response.json();

        if (!res.ok) {
            throw new Error(data.detail || "Errore sconosciuto")
        }

        if (!res.success) {
            throw new Error(data.detail || "Errore sconosciuto")
        }

        return result;
    } catch (error) {
        console.error(error.message);
    }

}
