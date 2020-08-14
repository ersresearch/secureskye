#!/usr/bin/env sh

sigterm_recieved="0"

sigterm_handler() {
    sigterm_recieved="1"
    echo "SIGTERM recieved. Send de-register request to Consul."
    curl -X PUT -sL -w "%{http_code}" "$CONSUL_HTTP_ADDR/v1/agent/service/deregister/socketio-$HOSTNAME"
    echo " Response status code from Consul."
    trap - SIGTERM # clear the trap

}
trap sigterm_handler SIGKILL SIGTERM SIGHUP SIGINT EXIT

echo "Server configurations: hostname = $(hostname), hostip = $(hostname -i), port = $SERVER_PORT"
sed -i -e "s|\$HOSTNAME|$(hostname)|g" -e "s|\$HOSTIP|$(hostname -i)|g" -e "s|\$SERVER_PORT|$SERVER_PORT|g" /etc/socketio-consul-register.json

# Register consul
echo "Send register request to Consul."
consul_resp="---"
until [ "$consul_resp" == "200" ] || [ "$sigterm_recieved" == "1" ]
do    
    consul_resp=$(curl -X PUT -sL -w "%{http_code}" -d "@/etc/socketio-consul-register.json" "$CONSUL_HTTP_ADDR/v1/agent/service/register")
    echo "$consul_resp Response status code from Consul."
    if [ $consul_resp != "200" ]; then
        echo "Retry after 5sec..."
        sleep 5
        echo "Retry send register request to Consul."
    fi
done

echo "Start socketio server."
until [ "$sigterm_recieved" == "1" ]
do
    node /home/node/app/index.js
    echo "Retry after 5sec..."
    sleep 5
    echo "Retry start socketio server."
done