import { useCallback } from "react";
import ProfileService from "../services/ProfileService";
import { useAuth } from "./useAuth";
import { useToast } from "./useToaster";

export function useProfile() {
    const { loadToast } = useToast()
    const { setUsersList, usersList } = useAuth()
    const updateProfile = useCallback((profileData) => {
        ProfileService.updateProfile(profileData)
            .then(({ data }) => {
                loadToast(data.msg, data.status)
            })
            .catch((e) => {
                console.log(e);
            })
    })

    const deleteProfile = useCallback((profileID) => {
        ProfileService.deleteProfile(profileID)
            .then(({ data }) => {
                loadToast(data.msg, data.status)
                if (data.status != "error" && data.status != "warning") {
                    setUsersList(usersList.filter(e => e.id_user != profileID))
                }
            })
            .catch((e) => {
                console.log(e);
            })
    })

    return { updateProfile, deleteProfile }
}