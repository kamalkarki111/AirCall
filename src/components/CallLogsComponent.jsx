import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import { useEffect, useState } from 'react';
import { ArchiveAll, getCalls } from "./../api/calls.api"
import { CallInfo } from './CallInfoComponent';
import Moment from 'react-moment';
import { isDiffDate } from '../helper/callHelper';
import { callDataContext } from '../contexts/CallContextProvider';
import { LoaderContext } from '../contexts/LoaderContextProvider';
import { ErrorContext } from '../contexts/ErrorHandlerProvider';
import { ArchiveOutlined, UnarchiveOutlined } from '@mui/icons-material';

export const CallLogs = React.memo(() => {

    const callsData = React.useContext(callDataContext);
    const loader = React.useContext(LoaderContext);
    const errorhandler = React.useContext(ErrorContext)

    useEffect(() => {
        getUpdatedCalls()
    }, [])

    /**
     * Retrieves updated calls from the server.
     */
    function getUpdatedCalls() {
        // Show loader while fetching calls
        loader.setShowLoader(true);

        // Fetch calls from server
        getCalls()
            .then(async (data) => {
                // Hide loader after fetching calls
                loader.setShowLoader(false);
                console.log(data.filter((val) => !val.is_archived));
                // Filter out archived calls and update call data sort in latest first
                callsData.value.setcallData([...data.filter((val) => !val.is_archived)?.reverse()]);
            })
            .catch((err) => {
                // Hide loader and handle error
                loader.setShowLoader(false);
                errorhandler.setError(err);
            });
    }

    /**
     * Archive all calls.
     */
    function archiveAllCalls() {
        // Show loader
        loader.setShowLoader(true);

        // Archive all calls
        ArchiveAll(callsData.value.callData)
            .then(() => {
                // Get updated calls
                getUpdatedCalls();

                // Hide loader
                loader.setShowLoader(false);
            })
            .catch((err) => {
                // Hide loader
                loader.setShowLoader(false);

                // Set error
                errorhandler.setError(err);
                // Get updated calls
                getUpdatedCalls();
            });
    }


    return (
        <AccordionGroup disableDivider sx={{ maxWidth: 400 }}>
            <>
                {callsData.value.callData.length > 0 && <div onClick={archiveAllCalls} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', color: '#2AC420', cursor: 'pointer' }}>
                    Archive all <ArchiveOutlined style={{ marginLeft: '5px' }} color={'success'}></ArchiveOutlined>
                </div>}
                {
                    callsData.value.callData.map((call, index) => (
                        <div key={call.id}>
                            {index === 0 && <Moment style={{ color: '#2AC420', marginLeft: "5px" }} format={"DD MMM YYYY"}>{call.created_at}</Moment>}
                            {index !== 0 && isDiffDate(callsData.value.callData[index - 1].created_at, call.created_at) && <Moment style={{ color: '#2AC420', marginLeft: "5px" }} format={"DD MMM YYYY"}>{callsData.value.callData[index - 1].created_at}</Moment>}
                            {!call.is_archived && <div>
                                <Accordion style={{ border: '1px solid #2AC420', margin: "5px", borderRadius: "5px" }} >
                                    <CallInfo call={call} updateCalls={getUpdatedCalls}></CallInfo>
                                </Accordion>
                            </div>}
                        </div>

                    ))
                }
            </>

        </AccordionGroup>
    );
})