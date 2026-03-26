FROM denoland/deno:alpine AS builder

WORKDIR /app

COPY deno.json deno.lock ./

RUN deno cache --frozen deno.json || true

COPY . .

RUN deno task build

RUN deno cache src/main.ts

FROM denoland/deno:alpine

USER deno
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src
COPY --from=builder /app/deno.json ./deno.json
COPY --from=builder /app/deno.lock ./deno.lock

COPY --from=builder /deno-dir /deno-dir

EXPOSE 3210
ENV PORT=3210

CMD ["deno", "run", "-E=PORT,ENV,READABLE_STREAM", "-N", "-RW", "--allow-run", "-S=networkInterfaces", "./src/main.ts"]
