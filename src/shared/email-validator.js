const email = v => {
    if(!v) return undefined;
    const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = email.test(String(v).toLowerCase());

    if(!result) {
        return "Email is invalid"
    }
    return undefined;
}

export default email;
