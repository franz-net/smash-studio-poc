import {Box, Container, Toolbar, useTheme} from "@mui/material";
import {Outlet} from "react-router-dom";
import {LeftDrawer, TopBar} from "../../components";
import {useState} from "react";

const drawerWidth = 240
export default function MasterLayout() {

    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    return (
        <Box
            sx={{
                display: 'flex',
            }}>

            <TopBar
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}

            />
            <LeftDrawer drawerWidth={drawerWidth}
                        handleDrawerToggle={handleDrawerToggle}
                        mobileOpen={mobileOpen}
            />

            {/* Main Content will render here... */}
            <Box
                component="main"
                sx={{
                    backgroundColor: theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto'
                }}
            >
                <Toolbar/>
                <Container
                    maxWidth="lg"
                    sx={{
                        mt: 4,
                        mb: 4
                    }}
                >
                    <Outlet/>
                </Container>
            </Box>
        </Box>
    )
}