const API_URL = "https://musicapi.predelli.site:8000"

function get_template_form(meth, form_data) {
    return {
        method: meth,
        credentials: "include",
        body: form_data
    }
}

async function api_request(route, method, form_data, retry = true) {
    const API_ROUTE = API_URL + "/" + route;
    try {
        const response = await fetch(API_ROUTE, get_template_form(method, form_data));
        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.detail.data == "AUTH_ERROR") {
                if (retry == true) {
                    const refreshed = await refresh_tokens();
                    if (refreshed == true) {
                        return api_request(route, method, form_data, false)
                    }
                } else {
                    window.location.replace("login.html");
                }
            }
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error(error.message);
    }
}

async function refresh_tokens() {
    const API_ROUTE = API_URL + "/refresh";

    try {
        const response = await fetch(API_ROUTE, {
            method: "POST",
            credentials: "include"
        });

        if (!response.ok) {
            window.location.replace("login.html");
            return false;
        }

        return true;

    } catch (error) {
        console.error(error.message);
        return false;
    }

}
