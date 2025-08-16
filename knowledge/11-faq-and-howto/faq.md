---
title: FAQ
version: 1.0.0
owner: ops@transbot.ai
visibility: agents,human-ops
scope: reference
---

**Why does /readyz fail while /healthz passes?**

Strict readiness requires DB + agents up. Health is liveness only.

**How do I add a new portal?**

Add spec in `/05-portals`, update registry.json, ensure flag seed, run `check:portals`.
