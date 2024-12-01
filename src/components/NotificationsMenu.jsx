import { IconButton, Popover, Box, Typography, Badge, useTheme } from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useContext, useEffect } from "react";
import { tokens } from "../theme";
import { WebSocketContext } from '../WebSocketContext';

const NotificationsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [notifications, setNotifications] = useState([]);
  const { notifConsumption, setNotifConsumption } = useContext(WebSocketContext);

  useEffect(() => {
    if (notifConsumption) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        `Vous avez consommé ${notifConsumption} L aujourd'hui.`,
      ]);
      setNotifConsumption('');
      setHasUnreadNotifications(true);
    }
  }, [notifConsumption]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setHasUnreadNotifications(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (index) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((_, i) => i !== index)
    );
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {/* IconButton avec un Badge conditionnel */}
      <IconButton onClick={handleClick}>
        <Badge
          color="error"
          variant="dot"
          invisible={!hasUnreadNotifications || notifications.length === 0}
        >
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2} maxWidth={300}>
          <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: 'center' }}>
            Mes notifications
          </Typography>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: colors.tidaly[100],
                  color: 'white',
                  padding: '10px',
                  marginBottom: '8px',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" sx={{ flex: 1 }}>
                  {notification}
                </Typography>

                <IconButton onClick={() => handleDelete(index)} sx={{ color: 'white' }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography variant="body2">Aucune notification</Typography>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default NotificationsMenu;
