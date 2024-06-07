export const validateFormData = (email, password) => {
    const error = {
        email: null,
        password: null
    }

    if (!email) {
        error.email = "Email is required!"
    }
    if (!password) {
        error.password = "Password is required!"
    }
    if (error.email || error.password) {
        return error
    } else {
        const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
        const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

        if (!isValidEmail) {
            error.email = "Email is not valid!"
        }
        if (!isValidPassword) {
            error.password = "Password is not valid!"
        }

        return error;
    }

}