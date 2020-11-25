const required = v => {
    if(typeof v !== 'number') {
        if( !v || v === '') {
            return "This value is required"
        }
    }
    return '';
}

export default required;