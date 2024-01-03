
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import CallMissedRoundedIcon from '@mui/icons-material/CallMissedRounded';
import { ArchiveRounded, ArrowDropDownRounded, CallMade, CallReceived, CallReceivedRounded, NoAccountsRounded, RecordVoiceOver, UnarchiveRounded } from '@mui/icons-material';
import { CallTabContext } from '../contexts/CallContextProvider';
import React from 'react';
import { archiveCall, unArchiveCall } from '../api/calls.api';
import { LoaderContext } from '../contexts/LoaderContextProvider';
import { ErrorContext } from '../contexts/ErrorHandlerProvider';
/**
 * Executes an archive/unachive call for the given ID.
 *
 * @param {type} id - The ID to be archived.
 * @return {type} No return value.
 */
export const CallInfo = React.memo(({ call, index, updateCalls })=> {

    const tabContext = React.useContext(CallTabContext);
    const loader = React.useContext(LoaderContext);
    const errorHandler = React.useContext(ErrorContext);

    /**
     * Executes an archive call for the given ID.
     *
     * @param {string} id - The ID to be archived.
     * @returns {void}
     */
    function archive(id) {
        // Show loader
        loader.setShowLoader(true);

        // Execute archive call and handle response
        archiveCall(id)
            .then((val) => {
                // Update calls
                updateCalls();

                // Hide loader
                loader.setShowLoader(false);
            })
            .catch((err) => {
                // Hide loader and handle error
                loader.setShowLoader(false);
                errorHandler.setError(err);
            });
    }

    /**
     * Unarchives an item with the given ID.
     *
     * @param {number} id - The ID of the item to unarchive.
     * @returns {Promise} A Promise that resolves with the result of the unarchive operation.
     */
    function unArchive(id) {
        // Show loader while unarchiving
        loader.setShowLoader(true);

        // Call the unarchive API
        return unArchiveCall(id)
            .then((val) => {
                // Hide loader after unarchiving
                loader.setShowLoader(false);

                // Update the UI with the new data
                updateCalls();
            })
            .catch((err) => {
                // Hide loader and handle error
                loader.setShowLoader(false);
                errorHandler.setError(err);
            });
    }

    return (
        <>
            <AccordionSummary>
                {call.call_type === 'missed' && <CallMissedRoundedIcon color={'error'} sx={{ mr: 1 }} />}
                {call.call_type === 'answered' && call.direction === 'inbound' && <CallReceivedRounded color={'success'} sx={{ mr: 1 }} />}
                {!call.call_type && call.direction === 'inbound' && <CallReceivedRounded color={'success'} sx={{ mr: 1 }} />}
                {call.call_type === 'voicemail' && call.direction === 'inbound' && <RecordVoiceOver color={'success'} sx={{ mr: 1 }} />}
                {call.call_type === 'answered' && call.direction === 'outbound' && <CallMade color={'warning'} sx={{ mr: 1 }} />}
                {(!call.call_type || !call.direction) && <NoAccountsRounded color={'warning'} sx={{ mr: 1 }} />}
                <div className='call-info-summery'>
                    <p style={{ color: 'black', fontWeight: 'bold', fontSize: '20px', margin: '0' }}>{call.from || 'Unknown'}<ArrowDropDownRounded color={'success'}></ArrowDropDownRounded></p>
                    <p style={{ color: 'black', opacity: '0.6', fontWeight: "normal", margin: 0 }}>{call.to || 'Unknown'}</p>
                </div>

            </AccordionSummary>
            <AccordionDetails>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <p><strong style={{ color: 'black' }}>From : </strong>{call.from || 'Unknown'} </p>
                    {tabContext.value.selectedtabs === 0 && <ArchiveRounded onClick={() => archive(call.id)} style={{ position: 'relative' }} color={'info'}></ArchiveRounded>}
                    {tabContext.value.selectedtabs === 1 && <UnarchiveRounded onClick={() => unArchive(call.id)} style={{ position: 'relative' }} color={'secondary'}></UnarchiveRounded>}
                </div>

                <p><strong style={{ color: 'black' }}>To : </strong>{call.to || 'Unknown'}</p>
                <p><strong style={{ color: 'black' }}>Via : </strong>{call.via || 'Unknown'}</p>
                {call.duration !== 0 && <p><strong style={{ color: 'black' }}>Duration : </strong>{call.duration ? call.duration / 60 ? `${Math.floor(call.duration / 60) + ' Minutes'} ${call.duration % 60 + ' Seconds'}` : Math.floor(call.duration / 60) + ' sec' : 'Unknown'}</p>}
            </AccordionDetails>
        </>
    )
})