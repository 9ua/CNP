FROM registry.gitlab.com/staygo-devops/baseimage/nodejs:latest AS builder

WORKDIR /home
COPY . /home
RUN npm install && \
    npm run build

FROM registry.gitlab.com/staygo-devops/baseimage/nginx:latest

WORKDIR /usr/share/nginx/html
COPY --from=builder /home/dist /usr/share/nginx/html/dist
# COPY --from=builder public/${K8S_NS}/config.json /usr/share/nginx/html/dist/config.json