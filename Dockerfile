FROM alpine:latest

# Enabled edge/community and edge/testing repositories - shadowsocks-libev is not available on main in alpine packagews
RUN echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories && \
    echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories && \
    echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache shadowsocks-libev

# Copy Shadowsocks config file
COPY config.json /etc/config.json

# Start the Shadowsocks client
CMD ["ss-local", "-c", "/etc/config.json"]