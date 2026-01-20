# Technical Design: [Feature Name]

**Issue:** #NNNN
**Spec:** [Link to feature spec]
**Author:** @username
**Status:** Draft | In Review | Approved
**Created:** YYYY-MM-DD

---

## 1. Overview

Brief summary of the technical approach.

---

## 2. Architecture

### Component Diagram

```mermaid
graph TB
    subgraph Frontend
        A[Component A]
        B[Component B]
    end
    subgraph Backend
        C[Service C]
        D[Service D]
    end
    subgraph Data
        E[(Database)]
    end
    
    A --> C
    B --> C
    C --> D
    D --> E
```

### Components Affected

| Component | Change Type | Description |
|-----------|-------------|-------------|
| ComponentA | New | New component for... |
| ServiceB | Modified | Add new endpoint... |
| TableC | Modified | Add columns... |

---

## 3. Data Model

### New/Modified Tables

```sql
-- New table
CREATE TABLE feature_data (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Modified table (add column)
ALTER TABLE existing_table ADD COLUMN new_field VARCHAR(100);
```

---

## 4. API Design

### New Endpoints

#### POST /api/v1/feature

**Request:**
```json
{
  "name": "string",
  "options": {
    "key": "value"
  }
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "name": "string",
  "created_at": "ISO8601"
}
```

**Errors:**

| Code | Description |
|------|-------------|
| 400 | Invalid request body |
| 401 | Unauthorized |
| 409 | Conflict - already exists |

---

## 5. Testing Strategy

### Unit Tests
- Test new service methods
- Test validation logic

### Integration Tests
- Test API endpoints
- Test database operations

### E2E Tests
- Test complete user flow

---

## 6. Security Considerations

- [ ] Authentication required
- [ ] Authorization checks
- [ ] Input validation
- [ ] Rate limiting
- [ ] Audit logging

---

## 7. Implementation Plan

| Phase | Tasks | Estimate |
|-------|-------|----------|
| 1 | Database migration | 2h |
| 2 | Backend API | 4h |
| 3 | Frontend UI | 4h |
| 4 | Tests | 2h |
| 5 | Documentation | 1h |

---

## 8. Checklist

- [ ] Feature spec approved
- [ ] Technical design approved
- [ ] Database migration ready
- [ ] API implementation complete
- [ ] Frontend implementation complete
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Security review (if needed)
- [ ] Performance tested
