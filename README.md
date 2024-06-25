# Siren

This is an open-source User Interface for the Lighthouse Ethereum Beacon Node
and Validator Client.

[![Book Status]][Book Link] [![Chat Badge]][Chat Link]

[Chat Badge]: https://img.shields.io/badge/chat-discord-%237289da
[Chat Link]: https://discord.gg/jpqcHXPRVJ
[Book Status]: https://img.shields.io/badge/user--docs-unstable-informational
[Book Link]: https://lighthouse-book.sigmaprime.io/lighthouse-ui.html
[stable]: https://github.com/sigp/siren/tree/stable
[unstable]: https://github.com/sigp/siren/tree/unstable

## Documentation

The [Lighthouse Book](https://lighthouse-book.sigmaprime.io) contains information for users and
developers. Specifically the [Lighthouse UI](https://lighthouse-book.sigmaprime.io/lighthouse-ui.html) section of the book.

## Running Siren

### Docker (Recommended)

Docker is the recommended way to run a webserver that hosts Siren and can be
connected to via a web browser.

`docker` is required to be installed with the service running.

Configuration is doen with environemnt variables, the best way to get started is by copying `.env.example` to `.env` and editing the relvant sections (typically, this would at least include `BEACON_URL`, `VALIDATOR_URL` and `API_TOKEN`)

Then to run the image:

`docker-compose up`  
or  
`docker run --rm -ti --name siren -p 3443:443 --env-file $PWD/.env sigp/siren`  

This will open port 3443 and allow your browser to connect. 


To start Siren, visit `https://localhost:3443` in your web browser. (ignore the certificate warning). 

Advanced users can mount their own certificate with `-v $PWD/certs:/certs` (the config expects 3 files: `/certs/cert.pem` `/certs/key.pem` `/certs/key.pass`)

## Building From Source

### Docker 

The docker image can be built with the following command:  
`docker build -f Dockerfile -t siren .`

### Building locally

Building from source requires `Node v18.18` and `yarn`.

#### Build and run the backend

#### Build and run the frontend

