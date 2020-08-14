#!/usr/bin/env sh

sigterm_recieved="0"

sigterm_handler() {
    sigterm_recieved="1"
    echo "SIGTERM recieved. Send de-register request to Consul."
    curl -X PUT -sL -w "%{http_code}" "$CONSUL_HTTP_ADDR/v1/agent/service/deregister/ui-$HOSTNAME"
    echo " Response status code from Consul."
    trap - SIGTERM # clear the trap
    if [ -f /var/run/nginx.pid ]; then
        echo "NGINX is running. Shuting down NGINX..."
        kill -QUIT $( cat /var/run/nginx.pid )
    fi
}
trap sigterm_handler SIGKILL SIGTERM SIGHUP SIGINT EXIT

echo "Server configurations: hostname = $(hostname), hostip = $(hostname -i), port = $SERVER_PORT"
sed -i -e "s|\$HOSTNAME|$(hostname)|g" -e "s|\$HOSTIP|$(hostname -i)|g" -e "s|\$SERVER_PORT|$SERVER_PORT|g" /etc/nginx-consul-register.json
sed -i -e "s|\$SERVER_PORT|$SERVER_PORT|g" /etc/nginx/conf.d/default.conf

echo "Send register request to Consul."
consul_resp="---"
until [ "$consul_resp" == "200" ] || [ "$sigterm_recieved" == "1" ]
do    
    consul_resp=$(curl -X PUT -sL -w "%{http_code}" -d "@/etc/nginx-consul-register.json" "$CONSUL_HTTP_ADDR/v1/agent/service/register")
    echo "$consul_resp Response status code from Consul."
    if [ $consul_resp != "200" ]; then
        echo "Retry after 5sec..."
        sleep 5
        echo "Retry send register request to Consul."
    fi
done

if [ "$sigterm_recieved" == "0" ]; then
    echo "Start nginx"
    /usr/sbin/nginx -c /etc/nginx/nginx.conf -g "daemon off;"
fi