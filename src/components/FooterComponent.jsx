import * as React from 'react';
import Box from '@mui/joy/Box';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import { ArchiveRounded, CallRounded } from '@mui/icons-material';
import { CallTabContext } from '../contexts/CallContextProvider';

/**
 * Renders the Footer component.
 *
 * @return {ReactNode} The rendered component.
 */
const Footer =  React.memo( () => {

  const [index, setIndex] = React.useState(0);
  
  const tabContext = React.useContext(CallTabContext);

  const colors = ['warning','warning']

/**
 * Sets the tab value and updates the selected tabs.
 * @param {number} value - The new tab value.
 */
function setTab(value) {
  // Set the tab index
  setIndex(value);

  // Update the selected tabs
  tabContext.value.setSelectedTabs(value);
}
  return (
    <Box
      sx={{
        width:'100%',
        flexGrow: 1,
        position: 'sticky',
        top:"100vh" 
      }}
    >
      <Tabs
        size="sm"
        aria-label="Bottom Navigation"
        value={index}
        onChange={(event, value) => setTab(value)}
        sx={(theme) => ({
          p: 1,
          borderRadius: 16,
          maxWidth: 400,
          mx: 'auto',
          boxShadow: theme.shadow.sm,
          '--joy-shadowChannel': theme.vars.palette[colors[index]].darkChannel,
          [`& .${tabClasses.root}`]: {
            py: 1,
            flex: 1,
            transition: '0.3s',
            fontWeight: 'md',
            fontSize: 'md',
            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
              opacity: 0.7,
            },
          },
        })}
      >
        <TabList
          variant="plain"
          size="sm"
          disableUnderline
          sx={{ borderRadius: 'lg', p: 0 }}
        >
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 0 && { color: colors[0] })}
          >
            <ListItemDecorator>
                <CallRounded color={'success'}></CallRounded>
            </ListItemDecorator>
            Calls
          </Tab>
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 1 && { color: colors[1] })}
          >
            <ListItemDecorator>
              <ArchiveRounded color={'info'}/>
            </ListItemDecorator>
            Archives
          </Tab>
        </TabList>
      </Tabs>
    </Box>
  );
})
export default Footer;