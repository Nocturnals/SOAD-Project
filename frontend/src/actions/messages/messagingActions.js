import axios from "axios";

import { messagingConst } from "../../constants/messagingConstants";

export function getLastMessages() {
    return dispatch => {
        dispatch(getLastMessages());

        axios
            .get("http://localhost:4000/api/chat/lastMessages")
            .then(res => {
                console.log("Data:" + res.data);
                dispatch(storeLastMessages());
            })
            .catch(err => {
                console.log("Error: " + err);
            });
    };

    // Actions to be dispatched
    function getLastMessages() {
        return { type: messagingConst.GET_LAST_MESSAGES };
    }
    function getCurrentConversation() {
        return { type: messagingConst.GET_CURRENT_CONVERSATION };
    }
    function storeLastMessages(lastMessages) {
        return {
            type: messagingConst.STORE_LAST_MESSAGES,
            lastMessages: lastMessages
        };
    }
    function storeCurrentConversation(currentConversation) {
        return {
            type: messagingConst.STORE_CURRENT_CONVERSATION,
            currentConversation: currentConversation
        };
    }
}

// export function sendMessage() {
//     return dispatch => {
//         axios.post("http://localhost:4000/api/chat/lastMessages")
//     }
// }
