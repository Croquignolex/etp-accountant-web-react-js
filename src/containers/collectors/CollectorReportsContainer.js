import {connect} from "react-redux";

import CollectorReportsComponent from "../../components/collectors/CollectorReportsComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    request: state.collectorsRequests.reports,
    reports: state.collectors.current.reports,
});

// Map dispatch function to component propsS
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(CollectorReportsComponent);