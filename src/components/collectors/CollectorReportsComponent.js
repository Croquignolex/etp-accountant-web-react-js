import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import ExcelFile from "react-data-export/dist/ExcelPlugin/components/ExcelFile";
import ExcelSheet from "react-data-export/dist/ExcelPlugin/elements/ExcelSheet";
import ExcelColumn from "react-data-export/dist/ExcelPlugin/elements/ExcelColumn";

import LoaderComponent from "../LoaderComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import DatePickerComponent from "../form/DatePickerComponent";
import {emitCollectorReportsFetch} from "../../redux/collectors/actions";
import {storeCollectorReportsRequestReset} from "../../redux/requests/collectors/actions";
import {formatString, requestFailed, requestLoading, shortDateToString} from "../../functions/generalFunctions";

// Component
function CollectorReportsComponent({collector, reports, reportGap, dispatch, request}) {
    // Local states
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Local effects
    useEffect(() => {
        dispatch(emitCollectorReportsFetch({
            id: collector.id,
            selectedDay: new Date()
        }));
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeCollectorReportsRequestReset());
    };

    // Selected date
    const handleSelectedDate = (selectedDay) => {
        shouldResetErrorData();
        setSelectedDate(selectedDay)
        dispatch(emitCollectorReportsFetch({
            id: collector.id,
            selectedDay: selectedDay
        }));
    }

    // Custom export button
    const ExportButton = () => {
        const tabName = `Rapport de la journée du ${shortDateToString(setSelectedDate, '-')} de ${collector.name}`;

        return (
            <ExcelFile element={
                <button type="button" className="btn btn-theme btn-sm mb-1 mr-1">
                    <i className="fa fa-file-export" /> Exporter sous excel
                </button>
            } filename={tabName}>
                <ExcelSheet data={reports} name="Rapport">
                    <ExcelColumn label="DATE" value="creation"/>
                    <ExcelColumn label="TYPE" value="type"/>
                    <ExcelColumn label="NATURE" value="label"/>
                    <ExcelColumn label="MOTIF" value="reason"/>
                    <ExcelColumn label="ACTIFS" value="in"/>
                    <ExcelColumn label="PASSIFS" value="out"/>
                </ExcelSheet>
            </ExcelFile>
        )
    }

    const activeReportData = useMemo(() => {
        return reports.reduce((acc, val) => acc + parseInt(val.in, 10), 0);
    }, [reports]);

    const passiveReportData = useMemo(() => {
        return reports.reduce((acc, val) => acc + parseInt(val.out, 10), 0);
    }, [reports]);

    const activeReportGap = useMemo(() => {
        return (reportGap >= 0) ? reportGap : 0;
    }, [reportGap]);

    const passiveReportGap = useMemo(() => {
        return (reportGap <= 0) ? (-1) * reportGap : 0;
    }, [reportGap]);

    const totalClass = ((activeReportData + activeReportGap) === (passiveReportData + passiveReportGap)) ? 'text-success' : 'text-danger';

    // Render
    return (
        <>
            {(requestLoading(request))  ? <LoaderComponent /> : (
                requestFailed(request) ? <ErrorAlertComponent message={request.message} /> : (
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <ExportButton />
                            <DatePickerComponent
                                showStartOnly
                                start={selectedDate}
                                handleStart={handleSelectedDate}
                            />
                            <div className="card">
                                <div className="table-responsive">
                                    <table className="table table-hover text-nowrap table-bordered">
                                        <thead>
                                            <tr>
                                                <th>DATE</th>
                                                <th>TYPE</th>
                                                <th>NATURE</th>
                                                <th>MOTIF</th>
                                                <th>ACTIFS</th>
                                                <th>PASSIFS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reports.map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{item.creation}</td>
                                                        <td>{item.type}</td>
                                                        <td title={item.label}>{formatString(item.label, 20)}</td>
                                                        <td title={item.reason}>{formatString(item.reason, 20)}</td>
                                                        <td>{item.in}</td>
                                                        <td>{item.out}</td>
                                                    </tr>
                                                )
                                            })}
                                            {reports.length !== 0 ? (
                                                <>
                                                    <tr>
                                                        <td colSpan={4}>Ecart de flottage</td>
                                                        <td>{activeReportGap}</td>
                                                        <td>{passiveReportGap}</td>
                                                    </tr>
                                                    <tr className="text-bold">
                                                        <td colSpan={4}>Total</td>
                                                        <td className={totalClass}>{activeReportData}</td>
                                                        <td className={totalClass}>{passiveReportData}</td>
                                                    </tr>
                                                </>
                                            ) : (
                                                <tr>
                                                    <td colSpan={8}>
                                                        <div className='alert custom-active text-center'>
                                                            Pas de mouvements
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    )
}

// Prop types to ensure destroyed props data type
CollectorReportsComponent.propTypes = {
    reports: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    collector: PropTypes.object.isRequired,
};

export default React.memo(CollectorReportsComponent);
