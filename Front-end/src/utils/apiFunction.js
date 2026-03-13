import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:8080"
});

export const getHeader = () => {
	const token = sessionStorage.getItem("token")
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

export async function getUsername() {
	try {
		const response = await api.get("/users/getusername",{
			headers : getHeader()
		} )
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
        const token = sessionStorage.getItem("token")
        const email = sessionStorage.getItem("userId")
		console.log((data))
		const response = await api.post(`/serviceProvider/service/fetch?email=${email}&homeService=${homeService}&reachWorkplace=${reachWorkplace}&companyName=${companyName}&profession=${profession}&price=${price}&state=${data.state}`,data,{
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
        const token = sessionStorage.getItem("token")
        const email = sessionStorage.getItem("userId")
        console.log(email)
		const response = await api.post(`/auth/emailcheck?email=${email}`,{
            // headers :  {
            //     Authorization: `Bearer ${token}`,
            // }
            headers : getHeader()
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
        const token = sessionStorage.getItem("token")
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
		const response = await api.post("/serviceProvider/service/setService",wrapperDto,{
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
        const token = sessionStorage.getItem("token")
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
        const token = sessionStorage.getItem("token")
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

export async function getFitness() {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.get("/serviceProvider/getFitness",{
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

export async function getArtAndRecreation() {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.get("/serviceProvider/getArtsAndRecreation",{
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

export async function getTimeslots(email) {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.get(`/UserBooking/getTimeslots?email=${email}`,{
            headers : {
                Authorization: `Bearer ${token}`,
            }
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

export async function getTimeslotsForService() {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.get("/serviceProvider/getTimeslots",{
            headers : {
                Authorization: `Bearer ${token}`,
            }
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

export async function getEnabled() {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.get("/serviceProvider/service/getEnabled",{
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

export async function setUserBooking(email,data) {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.post(`/UserBooking?email=${email}`,data,{
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

export async function getUserBooking(email) {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.get(`/UserBooking?email=${email}`,{
            headers : {
                Authorization: `Bearer ${token}`,
            }
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

export async function getBooking() {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.get("/serviceProvider/getBooking",{
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

export async function deleteBooking(data) {
  try {
    const token = sessionStorage.getItem("token");

    // 🔴 data MUST be an ARRAY
    const response = await api.delete(
      "/serviceProvider/service/deleteBooking",
      {
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error.response?.data || error);
    return null;
  }
}

export async function getBookingServices() {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.get("/UserBooking/getServices",{
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

export async function getAddressDetails() {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.get("/users/getdetails",{
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

export async function setAddressDetails(data) {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.post("/users/setdetails",data,{
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

export async function cancelOrder(email,data) {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.post(`/UserBooking/cancelOrder?providerEmail=${email}`,data,{
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

export async function sendEmailForCancellaion(email,data) {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.post(`/serviceProvider/service/sendEmailForCancelletion?email=${email}`,data,{
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

export async function SetOrderCompleted(bookedTime) {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.post("/serviceProvider/service/setOrderCompleted",{bookedTime:bookedTime},{
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

export async function rejectServiceProvider(data) {
	try {
        const token = sessionStorage.getItem("token")
		const response = await api.post("/admin/rejectServiceProvider",data,{
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