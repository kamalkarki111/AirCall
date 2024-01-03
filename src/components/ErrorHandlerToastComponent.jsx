import * as React from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';
import { ErrorContext } from '../contexts/ErrorHandlerProvider';

const ErrorHandler = React.memo(()=> {

    const errorHandler = React.useContext(ErrorContext)
    return (
        <React.Fragment>

            <Snackbar
                sx={{ position: 'absolute', bottom: 'unset', left: '10px', top:'70px' }}
                variant="soft"
                color="success"
                open={errorHandler.error ? true : false}
                onClose={() => errorHandler.setError('')}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
                endDecorator={
                    <Button
                        onClick={() => errorHandler.setError('')}
                        size="sm"
                        variant="soft"
                        color="success"
                    >
                        Dismiss
                    </Button>
                }
            >
                {errorHandler.error}
            </Snackbar>
        </React.Fragment>
    );
})

export default ErrorHandler;