import type { Brand } from "../utils/brand";

// oxlint-disable-next-line explicit-function-return-type explicit-module-boundary-types
function useBroadcastChannelFactory<T>(name: string) {
  const bc = new BroadcastChannel(name);

  const onMessage = (listener: (data: T) => unknown): void => {
    bc.addEventListener("message", (message: MessageEvent<T>) => listener(message.data));
  };

  const sendMessage = (data: T): void => {
    // oxlint-disable-next-line require-post-message-target-origin
    bc.postMessage(data);
  };

  return {
    onMessage,
    sendMessage,
  };
}

export type BroadcastChannel<T> = Brand<ReturnType<typeof useBroadcastChannelFactory<T>>>;
type BroadcastChannelFactory = <T>(...args: Parameters<typeof useBroadcastChannelFactory<T>>) => BroadcastChannel<T>;
export const useBroadcastChannel: BroadcastChannelFactory = useBroadcastChannelFactory;
