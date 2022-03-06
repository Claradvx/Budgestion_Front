import { useReducer } from "react";

export function IsConnected(){
    const [isConnected, setIsConnected] = useReducer(reducer, state);

    const state = { 
        isConnected: false
      };
    const action = {
        type: 'connection'
    };

    function reducer() {
        let newState;

    }
}