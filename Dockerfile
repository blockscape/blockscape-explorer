ARG FROM

FROM ${FROM}

EXPOSE 3000

WORKDIR /usr/src

CMD ["/usr/local/bin/node", "/usr/local/bin/ts-node", "lib/server.ts"]

STOPSIGNAL SIGINT

RUN npm i -g ts-node typescript

COPY package.json package.lock tsconfig.json dist/ /usr/src/

RUN npm i -production
