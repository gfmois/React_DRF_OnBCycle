import Http from "./http"

const DashboardService = {
    getDashboardInfo: () => {
        return Http().get('auth/dashboard')
    }
}

export default DashboardService