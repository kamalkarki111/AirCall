import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import { useEffect, useState } from 'react';
import { getCalls } from "./../api/calls.api"
import { CallInfo } from './CallInfoComponent';
import Moment from 'react-moment';
import { isDiffDate } from '../helper/callHelper';
import { ChatDataContext } from '../contexts/CallContextProvider';
import { LoaderContext } from '../contexts/LoaderContextProvider';
import { ErrorContext } from '../contexts/ErrorHandlerProvider';

export const CallLogs = React.memo(() => {

    const chatsData = React.useContext(ChatDataContext);
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

                // Filter out archived calls and update chat data
                chatsData.value.setChatData(data.filter((val) => !val.is_archived));
            })
            .catch((err) => {
                // Hide loader and handle error
                loader.setShowLoader(false);
                errorhandler.setError(err);
            });
    }



    return (
        <AccordionGroup disableDivider sx={{ maxWidth: 400 }}>
            {
                chatsData.value.chatData.map((call, index) => (
                    <div key={call.id}>
                        {index === 0 && <Moment style={{ color: '#2AC420', marginLeft: "5px" }} format={"DD MMM YYYY"}>{call.created_at}</Moment>}
                        {index !== 0 && isDiffDate(chatsData.value.chatData[index - 1].created_at, call.created_at) && <Moment style={{ color: '#2AC420', marginLeft: "5px" }} format={"DD MMM YYYY"}>{chatsData.value.chatData[index - 1].created_at}</Moment>}
                        {!call.is_archived && <div>
                            <Accordion style={{ border: '1px solid #2AC420', margin: "5px", borderRadius: "5px" }} >
                                <CallInfo call={call} updateCalls={getUpdatedCalls}></CallInfo>
                            </Accordion>
                        </div>}
                    </div>

                ))
            }

        </AccordionGroup>
    );
})