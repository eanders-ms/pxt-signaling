//% block="Signaling" color="#c40089"
namespace signaling {
    const callbacks: { [sig: string]: ((arg: string) => void)[] } = {};

    //% block
    //% blockId=signaling_on_signal
    //% draggableParameters="reporter"
    //% signal.defl="my signal"
    export function onSignal(signal: string, callback: (arg: string) => void): () => void {
        if (!callbacks[signal]) {
            callbacks[signal] = [];
        }
        const handlers = callbacks[signal];
        let index = -1;
        for (let i = 0; i < handlers.length; ++i) {
            if (!handlers[i]) {
                index = i;
                break;
            }
        }
        if (index < 0) {
            index = handlers.length;
            handlers.push(callback);
        } else {
            handlers[index] = callback;
        }
        return () => handlers[index] = undefined;
    }

    //% block
    //% blockId=signaling_send_signal
    export function sendSignal(signal: string, arg: string): void {
        const handlers = callbacks[signal];
        if (!handlers) return;
        handlers.filter(cb => !!cb).forEach(cb => cb(arg));
    }
}
