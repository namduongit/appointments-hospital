import { api, type RestResponse } from "../api/api"
import type { UserProfileModel } from "../models/UserProfile.model";

export const userDetail = async () => {
    const response = await api.get("/api/user/me");
    const restResponse: RestResponse = response.data;
    return restResponse;
}

export const updateUserProfile = async (profileData: UserProfileModel) => {  
    const response = await api.put("/api/user/profile", {
        fullName: profileData.fullName,
        phone: profileData.phone,
        address: profileData.address,
        birthDate: profileData.birthDate
    });
    const restResponse: RestResponse = response.data;
    return restResponse;
}