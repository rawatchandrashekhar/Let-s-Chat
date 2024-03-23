const messageValidation = (txt) => {
    return txt && txt.replace(/\s/g, '').length;
}

export { messageValidation }