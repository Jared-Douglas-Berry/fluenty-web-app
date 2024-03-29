import {createContext, useEffect, useState} from 'react';

const NotificationContext = createContext({
    notification: null, // {title, message, status}
    showNotification: function (notificationData) {
    },
    hideNotification: function () {
    }
});

export function NotificationContextProvider({children}) {
    const [activeNotification, setActiveNotification] = useState();

    useEffect(() => {
        if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
            const timer = setTimeout(() => {
                handleHideNotification();
            }, 3000)

            return () => {
                clearTimeout(timer);
            }
        }
    }, [activeNotification])

    function handleShowNotification(notificationData) {
        setActiveNotification(notificationData);
    }

    function handleHideNotification() {
        setActiveNotification(null);
    }

    const context = {
        notification: activeNotification,
        showNotification: handleShowNotification,
        hideNotification: handleHideNotification,
    };

    return <NotificationContext.Provider value={context}>
        {children}
    </NotificationContext.Provider>
}

export default NotificationContext;