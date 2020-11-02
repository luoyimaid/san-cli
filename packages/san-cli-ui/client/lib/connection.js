/**
 * @file Client连接状态的监听
 * @author jinzhan
 */

import emitter from 'tiny-emitter/instance';

const listeners = {
    connected: [],
    reconnected: [],
    disconnected: []
};

function onConnected(cb) {
    listeners.connected.push(cb);
    return () => off(listeners.connected, cb);
}

function onReconnected(cb) {
    listeners.reconnected.push(cb);
    return () => off(listeners.reconnected, cb);
}

function onDisconnected(cb) {
    listeners.disconnected.push(cb);
    return () => off(listeners.disconnected, cb);
}

function off(listeners, cb) {
    const index = listeners.indexOf(cb);
    if (index !== -1) {
        listeners.splice(index, 1);
    }
}

emitter.on('connected', (component, ...args) => {
    for (const listener of listeners.connected) {
        listener(component, args);
    }
});

emitter.on('reconnected', (component, ...args) => {
    for (const listener of listeners.reconnected) {
        listener(component, args);
    }
});

emitter.on('disconnected', (component, ...args) => {
    for (const listener of listeners.disconnected) {
        listener(component, args);
    }
});

module.exports = {
    onConnected,
    onReconnected,
    onDisconnected
};
