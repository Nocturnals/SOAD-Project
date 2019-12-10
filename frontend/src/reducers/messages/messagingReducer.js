import { messagingConst } from "../../constants/messagingConstants";

const initialState = {
    lastMessages: [],
    currentConversation: [],
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case messagingConst.GET_LAST_MESSAGES:
            return {
                ...state,
                lastMessages: [],
                isLoading: true
            };
        case messagingConst.STORE_LAST_MESSAGES:
            return {
                ...state,
                lastMessages: action.lastMessages,
                isLoading: false
            };
        case messagingConst.GET_CURRENT_CONVERSATION:
            return {
                ...state,
                currentConversation: [],
                isLoading: true
            };
        case messagingConst.STORE_CURRENT_CONVERSATION:
            return {
                ...state,
                currentConversation: action.currentConversation,
                isLoading: false
            };
        default:
            return initialState;
    }
}
