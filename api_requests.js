
function get_template_param(meth, inputs_key, inputs) {
    const form_data = new FormData();
    for (let i = 0; i < inputs.length; i++) {
        form_data.append(inputs_key[i], inputs[inputs_key[i]]);
    }
    return {
        method: meth,
        body: form_data
    }
}

function get_template_form(meth, form_data) {
    return {
        method: meth,
        body: form_data
    }
}

async function api_request(route, method, form_data) {
    const API = "http://127.0.0.1:8000";
    const API_ROUTE = API + "/" + route;
    try {
        const response = await fetch(API_ROUTE, get_template_form(method, form_data));
        if (!response.ok) {
            throw new Error("Response status :" + response.status);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error(error.message);
    }
}