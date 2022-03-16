// function to show error messages
 _showError = (res, code, err) => {
    return res.status(code).json({
        success: false,
        messgae: "Error : " + err
    });
}

module.exports = { _showError };