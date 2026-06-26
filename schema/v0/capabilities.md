<!-- SPDX-License-Identifier: CC-BY-4.0 -->

# Capability token registry — v0

Capability tokens negotiated via `client_capabilities` (client → server) and
`server_capabilities` (server → client), per spec §8. Tokens are lowercase,
`[a-z0-9._-]`, max 64 chars.

| Token | Since | Gates | Spec |
|---|---|---|---|
| `task-context-receipt` | v0.2.0 | `task_context.receipt` | §4.5.1 |
