import Http from "./http"

const ProfileService = {
    updateProfile: (profileData) => {
        return Http().post('auth/update_profile', profileData)
    },
    deleteProfile: (profileID) => {
        return Http().delete(`auth/delete_profile/${profileID}`)
    }
}

export default ProfileService