# Acceptance Criteria Templates

Detailed templates for each section of a comprehensive acceptance criteria document.

## 1. Happy Path Scenarios (Given-When-Then)

Produce 3–5 Gherkin scenarios covering the primary success flows:

```gherkin
Scenario: <descriptive name>
  Given <precondition>
  When <action>
  Then <expected outcome>
```

- Each scenario must have a single clear action and verifiable outcome.
- Cover the most common user journeys first.
- Use concrete example values, not placeholders.

## 2. Edge Case Scenarios

Generate scenarios for each applicable category:

- **Boundary values** — minimum, maximum, and just-beyond limits for all numeric and string fields.
- **Concurrency** — simultaneous operations on the same resource by multiple users or processes.
- **Timeouts** — system behavior when upstream services or user actions exceed expected time.
- **Unicode & special characters** — inputs with emoji, RTL text, multibyte characters, HTML/script injection attempts.
- **Maximum volumes** — behavior at upper capacity (max rows, max file size, max concurrent connections).

Write each as a Given-When-Then scenario.

## 3. Negative Scenarios

Cover at minimum:

- **Invalid inputs** — wrong data types, missing required fields, out-of-range values.
- **Unauthorized access** — unauthenticated requests, insufficient permissions, expired tokens.
- **Duplicate operations** — resubmission of forms, duplicate resource creation, idempotency checks.
- **Rate limiting** — behavior when request limits are exceeded.

Each scenario must specify the exact error response or user-facing message expected.

## 4. Error Handling Table

Present a table mapping every anticipated failure:

| Condition                      | Expected Behavior                                       | User-Facing Message                                  |
| ------------------------------ | ------------------------------------------------------- | ---------------------------------------------------- |
| e.g., Database connection lost | Retry 3× with exponential backoff, then fail gracefully | "Service temporarily unavailable. Please try again." |

Include at least 5 conditions relevant to the feature.

## 5. Non-Functional Requirements

Specify measurable thresholds for:

- **Performance** — response time (p50, p95, p99), throughput (requests/sec).
- **Accessibility** — WCAG conformance level, keyboard navigation, screen reader support.
- **Security** — authentication method, data encryption at rest and in transit, input sanitization.
- **Scalability** — expected user/data growth, horizontal scaling expectations.

## 6. Data Validation Rules Table

| Field       | Type   | Required | Constraints                    | Error Message                         |
| ----------- | ------ | -------- | ------------------------------ | ------------------------------------- |
| e.g., email | string | yes      | RFC 5322 format, max 254 chars | "Please enter a valid email address." |

Include every user-editable field in the feature.

## 7. UI/UX State Criteria

Define expected behavior for each UI state:

- **Loading** — skeleton screen or spinner, disabled controls, timeout fallback.
- **Empty** — illustration or message, call-to-action, guidance text.
- **Success** — confirmation message, next-step prompt, animation/transition.
- **Error** — inline validation, toast/banner, retry affordance, error detail visibility.

## 8. Definition of Done Checklist

Checklist that must be satisfied before the story is considered complete:

- [ ] All happy-path scenarios pass.
- [ ] All edge-case and negative scenarios pass.
- [ ] Error handling verified against the error table.
- [ ] NFRs validated with load/performance tests.
- [ ] Data validation rules enforced on client and server.
- [ ] UI states reviewed and approved by design.
- [ ] Accessibility audit passed.
- [ ] Code reviewed and merged.
- [ ] Documentation updated.
- [ ] Regression suite updated with new scenarios.
