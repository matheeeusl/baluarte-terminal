FROM node:22-bookworm-slim

LABEL maintainer="Matheus Laureano <matheuslaureanol1@gmail.com>"
LABEL description="Baluarte Terminal AI-jailed"

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    wget \
    ca-certificates \
    unzip \
    iptables \
    iproute2 \
    dnsutils \
    nano \
    jq \
    tree \
    && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY init-firewall.sh /usr/local/bin/init-firewall.sh
RUN chmod +x /usr/local/bin/init-firewall.sh

RUN mkdir -p /workspace && chown -R node:node /workspace

USER node
RUN curl -fsSL https://claude.ai/install.sh | bash

ENV SHELL=/bin/bash
ENV PATH="/home/node/.local/bin:${PATH}"
WORKDIR /workspace