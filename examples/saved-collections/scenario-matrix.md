# Scenario matrix — Saved collections

**SSOT:** [requirements.md](./requirements.md)  
**Run date:** 2026-07-02  
**Status:** Complete

| ID | Story / area | Category | Scenario | Expected behavior | If silent, agent may assume | Status | Owner | Follow-up |
| -- | ------------ | -------- | -------- | ----------------- | --------------------------- | ------ | ----- | --------- |
| SH-001 | Add/remove | Failure | Collection write fails while save succeeds | Keep save; show retryable collection error | Roll back save | Resolved | PO | PDR-LIB-002 |
| SH-002 | Picker | User error | User taps add repeatedly | One membership change; pending control disabled | Duplicate membership | Resolved | Eng | requirements AC |
| SH-003 | Delete | Feature interaction | Collection with saves is deleted | Delete collection only; saves remain in All saves | Delete saves | Resolved | PO | requirements AC |
| SH-004 | Accessibility | Accessibility | Long-press is unavailable | All actions remain available in the menu | Gesture-only action | Resolved | Design | requirements AC |
| SH-005 | Limits | Load / volume | Account reaches collection limit | Product-neutral numeric limit deferred with Engineering owner | Unlimited storage | Defer(spec) | Eng | OQ-03 |

## Staged change set

None — no blocking product change emerged in this example pass.
