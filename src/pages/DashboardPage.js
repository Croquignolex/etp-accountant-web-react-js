import PropTypes from 'prop-types';
import React, {useEffect, useMemo} from 'react';

import * as path from "../constants/pagePathConstants";
import {emitAllSimsFetch} from "../redux/sims/actions";
import {emitAllZonesFetch} from "../redux/zones/actions";
import * as setting from "../constants/settingsConstants";
import {emitAllAgentsFetch} from "../redux/agents/actions";
import {emitFetchUserBalance} from "../redux/user/actions";
import {formatNumber} from "../functions/generalFunctions";
import HeaderComponent from "../components/HeaderComponent";
import {emitAllVendorsFetch} from "../redux/vendors/actions";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";
import {emitAllManagersFetch} from "../redux/managers/actions";
import {emitAllCompaniesFetch} from "../redux/companies/actions";
import {emitAllOperatorsFetch} from "../redux/operators/actions";
import {emitAllOverseersFetch} from "../redux/overseers/actions";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import {emitAllCollectorsFetch} from "../redux/collectors/actions";
import {emitAllSupervisorsFetch} from "../redux/supervisors/actions";
import {emitAllAccountantsFetch} from "../redux/accountants/actions";
import {storeAllSimsRequestReset} from "../redux/requests/sims/actions";
import {storeAllZonesRequestReset} from "../redux/requests/zones/actions";
import {emitAllAdministratorsFetch} from "../redux/administrators/actions";
import {storeAllAgentsRequestReset} from "../redux/requests/agents/actions";
import {storeAllVendorsRequestReset} from "../redux/requests/vendors/actions";
import {storeAllManagersRequestReset} from "../redux/requests/managers/actions";
import {storeUserBalanceFetchRequestReset} from "../redux/requests/user/actions";
import {storeAllCompaniesRequestReset} from "../redux/requests/companies/actions";
import {storeAllOperatorsRequestReset} from "../redux/requests/operators/actions";
import {storeAllOverseersRequestReset} from "../redux/requests/overseers/actions";
import {COLLECTOR_TYPE, FLEET_TYPE, MASTER_TYPE} from "../constants/typeConstants";
import {storeAllCollectorsRequestReset} from "../redux/requests/collectors/actions";
import {storeAllSupervisorsRequestReset} from "../redux/requests/supervisors/actions";
import {storeAllAccountantsRequestReset} from "../redux/requests/accountants/actions";
import {storeAllAdministratorsRequestReset} from "../redux/requests/administrators/actions";
import DashboardWithOperatorCardComponent from "../components/dashboard/DashboardWithOperatorCardComponent";

// Component
function DashboardPage({settings, sims, dispatch, allSimsRequests, location}) {
    // Local effects
    useEffect(() => {
        fillDashboardData();
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Fill dashboard
    const fillDashboardData = () => {
        dispatch(emitAllSimsFetch());
        dispatch(emitAllZonesFetch());
        dispatch(emitAllAgentsFetch());
        dispatch(emitAllVendorsFetch());
        dispatch(emitFetchUserBalance());
        dispatch(emitAllManagersFetch());
        dispatch(emitAllCompaniesFetch());
        dispatch(emitAllOperatorsFetch());
        dispatch(emitAllOverseersFetch());
        dispatch(emitAllCollectorsFetch());
        dispatch(emitAllSupervisorsFetch());
        dispatch(emitAllAccountantsFetch());
        dispatch(emitAllAdministratorsFetch());
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllSimsRequestReset());
        dispatch(storeAllZonesRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeAllVendorsRequestReset());
        dispatch(storeAllManagersRequestReset());
        dispatch(storeAllCompaniesRequestReset());
        dispatch(storeAllOverseersRequestReset());
        dispatch(storeAllOperatorsRequestReset());
        dispatch(storeAllCollectorsRequestReset());
        dispatch(storeAllSupervisorsRequestReset());
        dispatch(storeAllAccountantsRequestReset());
        dispatch(storeUserBalanceFetchRequestReset());
        dispatch(storeAllAdministratorsRequestReset());
    };

    // Data
    const cardsData = settings.cards;
    const mtnMasterFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => ((sim.operator.id === '1') && (sim.type.name === MASTER_TYPE)));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const orangeMasterFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => ((sim.operator.id === '2') && (sim.type.name === MASTER_TYPE)));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const yupMasterFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => ((sim.operator.id === '3') && (sim.type.name === MASTER_TYPE)));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const mtnFleetFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => ((sim.operator.id === '1') && (sim.type.name === FLEET_TYPE)));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const orangeFleetFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => ((sim.operator.id === '2') && (sim.type.name === FLEET_TYPE)));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const yupFleetFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => ((sim.operator.id === '3') && (sim.type.name === FLEET_TYPE)));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const mtnCollectorFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => ((sim.operator.id === '1') && (sim.type.name === COLLECTOR_TYPE)));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const orangeCollectorFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => ((sim.operator.id === '2') && (sim.type.name === COLLECTOR_TYPE)));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const yupCollectorFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => ((sim.operator.id === '3') && (sim.type.name === COLLECTOR_TYPE)));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);

    // Render
    return (
        <div>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={DASHBOARD_PAGE} icon={'fa fa-tachometer-alt'} />
                    <section className="content">
                        <div className='container-fluid'>
                            {/* Master Fleet balance */}
                            <div className="row">
                                {cardsData.includes(setting.CARD_MASTER_FLEET_SIMS_FLEETS_MTN) &&
                                    <div className="col-lg-3 col-md-4 col-sm-6">
                                        <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                            operator={{id: '1'}}
                                                                            request={allSimsRequests}
                                                                            url={path.MASTERS_SIMS_PAGE_PATH}
                                                                            data={formatNumber(mtnMasterFleetSimsFleetsData.value)}
                                                                            label={`${setting.LABEL_MASTER_FLEET_SIMS_FLEETS_MTN} (${mtnMasterFleetSimsFleetsData.number})`}
                                        />
                                    </div>
                                }
                                {cardsData.includes(setting.CARD_MASTER_FLEET_SIMS_FLEETS_ORANGE) &&
                                    <div className="col-lg-3 col-md-4 col-sm-6">
                                        <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                            operator={{id: '2'}}
                                                                            request={allSimsRequests}
                                                                            url={path.MASTERS_SIMS_PAGE_PATH}
                                                                            data={formatNumber(orangeMasterFleetSimsFleetsData.value)}
                                                                            label={`${setting.LABEL_MASTER_FLEET_SIMS_FLEETS_ORANGE} (${orangeMasterFleetSimsFleetsData.number})`}
                                        />
                                    </div>
                                }
                                {cardsData.includes(setting.CARD_MASTER_FLEET_SIMS_FLEETS_YUP) &&
                                    <div className="col-lg-3 col-md-4 col-sm-6">
                                        <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                            operator={{id: '3'}}
                                                                            request={allSimsRequests}
                                                                            url={path.MASTERS_SIMS_PAGE_PATH}
                                                                            data={formatNumber(yupMasterFleetSimsFleetsData.value)}
                                                                            label={`${setting.LABEL_MASTER_FLEET_SIMS_FLEETS_YUP} (${yupMasterFleetSimsFleetsData.number})`}
                                        />
                                    </div>
                                }
                            </div>
                            {/* Fleet Fleet balance */}
                            <div className="row">
                                {cardsData.includes(setting.CARD_FLEET_FLEET_SIMS_FLEETS_MTN) &&
                                    <div className="col-lg-3 col-md-4 col-sm-6">
                                        <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                            operator={{id: '1'}}
                                                                            request={allSimsRequests}
                                                                            url={path.FLEETS_SIMS_PAGE_PATH}
                                                                            data={formatNumber(mtnFleetFleetSimsFleetsData.value)}
                                                                            label={`${setting.LABEL_FLEET_FLEET_SIMS_FLEETS_MTN} (${mtnFleetFleetSimsFleetsData.number})`}
                                        />
                                    </div>
                                }
                                {cardsData.includes(setting.CARD_FLEET_FLEET_SIMS_FLEETS_ORANGE) &&
                                    <div className="col-lg-3 col-md-4 col-sm-6">
                                        <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                            operator={{id: '2'}}
                                                                            request={allSimsRequests}
                                                                            url={path.FLEETS_SIMS_PAGE_PATH}
                                                                            data={formatNumber(orangeFleetFleetSimsFleetsData.value)}
                                                                            label={`${setting.LABEL_MASTER_FLEET_SIMS_FLEETS_ORANGE} (${orangeFleetFleetSimsFleetsData.number})`}
                                        />
                                    </div>
                                }
                                {cardsData.includes(setting.CARD_FLEET_FLEET_SIMS_FLEETS_YUP) &&
                                    <div className="col-lg-3 col-md-4 col-sm-6">
                                        <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                            operator={{id: '3'}}
                                                                            request={allSimsRequests}
                                                                            url={path.FLEETS_SIMS_PAGE_PATH}
                                                                            data={formatNumber(yupFleetFleetSimsFleetsData.value)}
                                                                            label={`${setting.LABEL_FLEET_FLEET_SIMS_FLEETS_YUP} (${yupFleetFleetSimsFleetsData.number})`}
                                        />
                                    </div>
                                }
                            </div>
                            {/* Collector Fleet balance */}
                            <div className="row">
                                {cardsData.includes(setting.CARD_COLLECTOR_FLEET_SIMS_FLEETS_MTN) &&
                                    <div className="col-lg-3 col-md-4 col-sm-6">
                                        <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                            operator={{id: '1'}}
                                                                            request={allSimsRequests}
                                                                            url={path.COLLECTORS_SIMS_PAGE_PATH}
                                                                            data={formatNumber(mtnCollectorFleetSimsFleetsData.value)}
                                                                            label={`${setting.LABEL_COLLECTOR_FLEET_SIMS_FLEETS_MTN} (${mtnCollectorFleetSimsFleetsData.number})`}
                                        />
                                    </div>
                                }
                                {cardsData.includes(setting.CARD_COLLECTOR_FLEET_SIMS_FLEETS_ORANGE) &&
                                    <div className="col-lg-3 col-md-4 col-sm-6">
                                        <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                            operator={{id: '2'}}
                                                                            request={allSimsRequests}
                                                                            url={path.COLLECTORS_SIMS_PAGE_PATH}
                                                                            data={formatNumber(orangeCollectorFleetSimsFleetsData.value)}
                                                                            label={`${setting.LABEL_COLLECTOR_FLEET_SIMS_FLEETS_ORANGE} (${orangeCollectorFleetSimsFleetsData.number})`}
                                        />
                                    </div>
                                }
                                {cardsData.includes(setting.CARD_COLLECTOR_FLEET_SIMS_FLEETS_YUP) &&
                                    <div className="col-lg-3 col-md-4 col-sm-6">
                                        <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                            operator={{id: '3'}}
                                                                            request={allSimsRequests}
                                                                            url={path.COLLECTORS_SIMS_PAGE_PATH}
                                                                            data={formatNumber(yupCollectorFleetSimsFleetsData.value)}
                                                                            label={`${setting.LABEL_COLLECTOR_FLEET_SIMS_FLEETS_YUP} (${yupCollectorFleetSimsFleetsData.number})`}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </AppLayoutContainer>
        </div>
    )
}

// Prop types to ensure destroyed props data type
DashboardPage.propTypes = {
    sims: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    vendors: PropTypes.array.isRequired,
    managers: PropTypes.array.isRequired,
    operators: PropTypes.array.isRequired,
    companies: PropTypes.array.isRequired,
    overseers: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    collectors: PropTypes.array.isRequired,
    supervisors: PropTypes.array.isRequired,
    accountants: PropTypes.array.isRequired,
    administrators: PropTypes.array.isRequired,
    allSimsRequests: PropTypes.object.isRequired,
    allZonesRequests: PropTypes.object.isRequired,
    allAgentsRequests: PropTypes.object.isRequired,
    allVendorsRequests: PropTypes.object.isRequired,
    allManagersRequests: PropTypes.object.isRequired,
    allCompaniesRequests: PropTypes.object.isRequired,
    allOperatorsRequests: PropTypes.object.isRequired,
    allOverseersRequests: PropTypes.object.isRequired,
    allCollectorsRequests: PropTypes.object.isRequired,
    allSupervisorsRequests: PropTypes.object.isRequired,
    allAccountantsRequests: PropTypes.object.isRequired,
    allAdministratorsRequests: PropTypes.object.isRequired,
};

export default React.memo(DashboardPage);