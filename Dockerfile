FROM node:22-alpine AS build

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

COPY build.js ./
COPY src ./src
COPY dist ./dist

RUN NODE_ENV=production npm run build


FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN set -e; \
    apk add --no-cache tini; \
    npm ci --omit=dev

COPY src ./src
COPY --from=build /build/dist ./dist

RUN adduser -D ackee ackee && chown -R ackee:ackee /app
USER ackee

HEALTHCHECK --interval=1m --timeout=45s CMD [ "/app/src/healthcheck.js" ]

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--", "npm"]
CMD ["start"]
