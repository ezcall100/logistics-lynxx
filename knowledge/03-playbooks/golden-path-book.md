---
title: Golden Path — Quote→Book→Bill
version: 1.1.0
owner: brokerage@transbot.ai
visibility: agents,human-ops
scope: playbook
ttl_days: 60
last_validated: 2025-08-15
---

## Steps (agents execute)

1) Quote: call Rates API (idempotent key `<tenant>:<lane>:<ts>`), store span `agent.fn.rates.price_one`.
2) Tender: create 204, await 990 ACK, span `agent.fn.edi.204_tender`.
3) Track: 214 events, ETA prediction; quarantine anomalies.
4) Docs: POD OCR → fraud checks → billing packet.
5) Invoice: 210 or direct AR; factoring if enabled.

## Success criteria

- Quote-to-book ≥ 85%, invoice accuracy ≥ 99%.
