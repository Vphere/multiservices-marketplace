import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:8080"
});

export const getHeader = () => {
	const token = localStorage.getItem("token")
    console.log(token);
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

export async function serviceProviderform(data,homeService,reachWorkplace,companyName,profession,price) {
	try {
        const token = localStorage.getItem("token")
        const email = localStorage.getItem("userId")
		console.log((data))
		const response = await api.post(`/serviceProvider/fetch?email=${email}&homeService=${homeService}&reachWorkplace=${reachWorkplace}&companyName=${companyName}&profession=${profession}&price=${price}&state=${data.state}`,data,{
            headers :  {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",        
            }
            // headers : getHeader()
        })
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			throw new Error("user already exist!!");
		}
	} catch (error) {
		console.error(error);
		throw new Error("user already exist!!");
	}
}

export async function userCheck() {
	try {
        const token = localStorage.getItem("token")
        const email = localStorage.getItem("userId")
        console.log(email)
		const response = await api.post(`/serviceProvider/emailcheck?email=${email}`,{
            headers :  {
                Authorization: `Bearer ${token}`,
            }
            // headers : getHeader()
        })
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			throw new Error("user already exist!!");
		}
	} catch (error) {
		console.error(error);
		throw new Error("user already exist!!");
	}
}

export async function pendingRequest() {
	try {
		const response = await api.get("/admin/pendingUser",{
            headers : getHeader()
        })
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

export async function setEnabled(email,enabled) {
	try {
        const data = new FormData();
        data.append("email",email);
        data.append("enable",enabled);
        const token = localStorage.getItem("token")
		const response = await api.post("/admin/enabled",data,{
            headers : {
                Authorization: `Bearer ${token}`,
            }
        })
		if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

export async function setTimeslot(wrapperDto) {
	try {
		const response = await api.post("/serviceProvider/setService",wrapperDto,{
            headers : getHeader()
        })
		if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

export async function getHomeService() {
	try {
        const token = localStorage.getItem("token")
		const response = await api.get("/serviceProvider/getHomeService",{
            headers : {
                Authorization: `Bearer ${token}`,
            }
        })
		if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}


export async function getBeauty() {
	try {
        const token = localStorage.getItem("token")
		const response = await api.get("/serviceProvider/getBeauty",{
            headers : {
                Authorization: `Bearer ${token}`,
            }
        })
		if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

export async function getTimeslots() {
	try {
        const token = localStorage.getItem("token")
		const response = await api.get("/serviceProvider/getTimeslots",{
            headers : {
                Authorization: `Bearer ${token}`,
            }
        })
		if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

export async function getEnabled() {
	try {
        const token = localStorage.getItem("token")
		const response = await api.get("/serviceProvider/getEnabled",{
            headers : {
                Authorization: `Bearer ${token}`,
            }
        })
		if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}