FROM golang:rc-alpine3.15 AS builder

WORKDIR /go/src/codeeducation

RUN mkdir /go/src/codeeducation -p
RUN go mod init codeeducation
COPY main.go .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /codeeducation


FROM scratch

COPY --from=builder /codeeducation /codeeducation
ENTRYPOINT ["/codeeducation"] 