/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
/* Stomp over websocket */
declare module 'stompjs';
declare module 'sockjs-client';
