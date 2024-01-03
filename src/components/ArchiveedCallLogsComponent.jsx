import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import { useEffect } from 'react';
import { getCalls, unArchiveAll } from "../api/calls.api"
import { CallInfo } from './CallInfoComponent';
import Moment from 'react-moment'
import { isDiffDate } from '../helper/callHelper';
import { ArchivedChatDataContext } from '../contexts/CallContextProvider';
import { UnarchiveOutlined } from '@mui/icons-material';
import { LoaderContext } from '../contexts/LoaderContextProvider';
import { ErrorContext } from '../contexts/ErrorHandlerProvider';

export const ArchivedCallLogs = React.memo(() => {

    const archiveChatData = React.useContext(ArchivedChatDataContext)
    const loader = React.useContext(LoaderContext);
    const errorHandler = React.useContext(ErrorContext)

    useEffect(() => {
        getUpdatedCalls()
    }, [])

    /**
     * Retrieves and updates the list of calls.
     */
    function getUpdatedCalls() {
        // Show loader
        loader.setShowLoader(true);

        // Get calls
        getCalls()
            .then(async (data) => {
                // Hide loader
                loader.setShowLoader(false);

                // Set archived chat data
                archiveChatData.value.setArchivedChatData(data.filter((val => val.is_archived)));
            })
            .catch((err) => {
                // Hide loader and handle error
                loader.setShowLoader(false);
                errorHandler.setError(err);
            });
    }

    /**
     * Unarchives all calls.
     */
    function unArchiveAllCalls() {
        // Show loader
        loader.setShowLoader(true);

        // Unarchive all calls
        unArchiveAll()
            .then((val) => {
                // Hide loader
                loader.setShowLoader(false);

                // Get updated calls
                getUpdatedCalls();
            })
            .catch((err) => {
                // Hide loader
                loader.setShowLoader(false);

                // Handle error
                errorHandler.setError(err);
            });
    }


    return (
        <AccordionGroup sx={{ maxWidth: 400 }}>
            {
                <>
                    {archiveChatData.value.archivedChatData.length > 0 && <div onClick={unArchiveAllCalls} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', color: '#2AC420', cursor: 'pointer' }}>
                        Unarchive all <UnarchiveOutlined style={{ marginLeft: '5px' }} color={'success'}></UnarchiveOutlined>
                    </div>}
                    {
                        archiveChatData.value.archivedChatData.map((call, index) => (
                            <div key={call.id}>
                                {index === 0 && <Moment style={{ color: '#2AC420', marginLeft: "5px" }} format={"DD MMM YYYY"}>{call.created_at}</Moment>}
                                {index !== 0 && isDiffDate(archiveChatData.value.archivedChatData[index - 1].created_at, call.created_at) && <Moment style={{ color: '#2AC420', marginLeft: "5px" }} format={"DD MMM YYYY"}>{archiveChatData.value.archivedChatData[index - 1].created_at}</Moment>}
                                {call.is_archived && <div>
                                    <Accordion style={{ border: '1px solid #2AC420', margin: "5px", borderRadius: "5px" }} >
                                        <CallInfo call={call} updateCalls={getUpdatedCalls}></CallInfo>
                                    </Accordion>
                                </div>}

                            </div>

                        ))
                    }
                    {
                        archiveChatData.value.archivedChatData.length === 0 && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "40px" }}>No Archived Chats</div>
                    }

                </>

            }

        </AccordionGroup>
    );
})