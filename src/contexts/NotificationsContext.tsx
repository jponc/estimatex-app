import React, { useState, useEffect } from "react";
import { Snackbar } from "react-native-paper";

type NotificationsContextType = {
  showMessage: (message: string) => void;
};

export const NotificationsContext = React.createContext<
  NotificationsContextType
>({
  showMessage: () => {},
});

export const NotificationsContainer: React.FC = ({ children }) => {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const showMessage = (message: string) => {
    setSnackbarMessage(message);
  };

  const contextValue = {
    showMessage,
  };

  useEffect(() => {
    if (snackbarMessage === "") {
      setIsSnackbarVisible(false);
    } else {
      setIsSnackbarVisible(true);
    }
  }, [snackbarMessage]);

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
      <Snackbar
        visible={isSnackbarVisible}
        duration={4000}
        onDismiss={() => setSnackbarMessage("")}
      >
      {snackbarMessage}
      </Snackbar>
    </NotificationsContext.Provider>
  );
};
