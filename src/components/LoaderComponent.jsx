import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { LoaderContext } from '../contexts/LoaderContextProvider';

/**
 * Render a loader component based on the value of showLoader.
 *
 * @return {JSX.Element} The loader component.
 */
const Loader = React.memo(()=> {

    const { showLoader } = React.useContext(LoaderContext);
    return (
        <>
           {showLoader && <div style={{position:'absolute',left:'0',top:'0',height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Box sx={{ width: "100%", height:"100%",backgroundColor:'#FFFFFF'}}>
                    <Skeleton animation="wave" height={'80px'} style={{marginLeft:'20px', width:'90%' , backgroundColor: 'lightgreen'}}/>
                    <Skeleton animation="wave" height={'80px'} style={{marginLeft:'20px', width:'90%' , backgroundColor: 'lightgreen'}}/>
                    <Skeleton animation="wave" height={'80px'} style={{marginLeft:'20px', width:'90%' , backgroundColor: 'lightgreen'}}/>
                    <Skeleton animation="wave" height={'80px'} style={{marginLeft:'20px', width:'90%' , backgroundColor: 'lightgreen'}}/>
                    <Skeleton animation="wave" height={'80px'} style={{marginLeft:'20px', width:'90%' , backgroundColor: 'lightgreen'}}/>
                    <Skeleton animation="wave" height={'80px'} style={{marginLeft:'20px', width:'90%' , backgroundColor: 'lightgreen'}}/>
                </Box>
            </div>}
        </>
    );
})

export default Loader;
