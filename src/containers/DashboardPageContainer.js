import {connect} from "react-redux";

import DashboardPage from "../pages/DashboardPage";
import {setPageTitle} from "../functions/generalFunctions";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";

setPageTitle(DASHBOARD_PAGE);

// Map state function to component props
const mapStateToProps = (state) => ({
    sims: state.sims.list,
    settings: state.settings,
    allSimsRequests: state.simsRequests.all,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);