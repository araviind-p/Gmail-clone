import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";

const store = configureStore({
    reducer: {
        appSlice: appReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore all action types
                ignoredActions: [
                    'appSlice/setOpen',
                    'appSlice/setEmails',
                    'appSlice/setSelectedEmail',
                    'appSlice/setSearchText',
                    'appSlice/setUser',
                    'appSlice/setSideBarOpen',
                    'appSlice/setArchievedMails',
                    'appSlice/setStarredMails',
                    'appSlice/setLoading',
                    'appSlice/setCheckedMails',
                    'appSlice/setTempEmails',
                    'appSlice/setCheckedCount',
                    'appSlice/resetCheckedCount'
                ],
                // Ignore all paths in actions
                ignoredActionPaths: ['payload.createdAt', 'payload.timestamp'],
                // Ignore all paths in the state
                ignoredPaths: [
                    'appSlice.emails.createdAt',
                    'appSlice.archievedMails.createdAt',
                    'appSlice.checkedMails',
                    'appSlice.tempEmails',
                    'appSlice.selectedEmail',
                    'appSlice.user',
                    'appSlice.searchText',
                    'appSlice.sideBarOpen',
                    'appSlice.open',
                    'appSlice.starredMails',
                    'appSlice.loading',
                    'appSlice.checkedCount'
                ],
            },
        }),
});

export default store;
