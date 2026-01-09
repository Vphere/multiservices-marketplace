import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:8080"
});

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

export async function VerifyUser(email,otp) {
    const VerifyUserDto  = {
        verificationCode : otp,
        email : email
    }
    try{
        const response = await api.post("/auth/verify",VerifyUserDto);

        return response.data;

    }catch(e){
        throw new Error(e.message);
    }

}

export async function resendOtp(email) {
    console.log(email);
    try{
        const response = await api.post(`/auth/resend?email=${email}`);
        return response.data;
    }catch(e){
        throw new Error(e.message);
    }
}

export async function VerifyExistingUser(email) {
    const VerifyUserDto  = {
        email
    }
    try{
        const response = await api.post(`/auth/sendOtp-to-login?email=${email}`);

        return response.data;

    }catch(e){
        throw new Error(e.message);
    }

}

export async function ResetpasswordofUser(email,password) {
    const input  = {
        email : email,
        password : password
    }
    try{
        const response = await api.post("/auth/reset-password",input);
        return response.data;
    }catch(e){
        throw new Error(e.message);
    }

}

export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/signup", registration)
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}

export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}