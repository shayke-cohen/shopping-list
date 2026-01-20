# Shopping List App - Test Plan

## Overview
This document outlines the test plan for the Shopping List web application.

**Application URL:** http://localhost:3000  
**Test Date:** 2026-01-20  
**Tester:** AI Tester (Automated)

---

## Test Scope

### Features to Test
1. Add items to shopping list
2. Mark items as completed
3. Delete items from list
4. Filter items (All/Active/Completed)
5. Clear completed items
6. Data persistence (localStorage)
7. UI/UX responsiveness

### Out of Scope
- Performance testing
- Security testing
- Cross-browser compatibility (testing on Chromium only)

---

## Test Cases

### TC-001: Add New Item
**Priority:** High  
**Precondition:** App is loaded with empty list or existing items

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Enter "Apples" in input field | Text appears in input |
| 2 | Click "Add" button | Item "Apples" appears in list |
| 3 | Verify input field is cleared | Input field is empty |
| 4 | Verify item count updates | Counter shows correct count |

---

### TC-002: Mark Item as Completed
**Priority:** High  
**Precondition:** At least one item exists in the list

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click checkbox on an item | Checkbox becomes checked |
| 2 | Verify item appears crossed out | Text has strikethrough |
| 3 | Verify item count decreases | "X items left" updates |

---

### TC-003: Delete Item
**Priority:** High  
**Precondition:** At least one item exists in the list

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Hover over an item | Delete button (X) appears |
| 2 | Click delete button | Item is removed from list |
| 3 | Verify item no longer visible | Item not in DOM |

---

### TC-004: Filter - Active Items
**Priority:** Medium  
**Precondition:** List has both active and completed items

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Active" filter button | Button becomes active |
| 2 | Verify only unchecked items show | Completed items hidden |

---

### TC-005: Filter - Completed Items
**Priority:** Medium  
**Precondition:** List has both active and completed items

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Completed" filter button | Button becomes active |
| 2 | Verify only checked items show | Active items hidden |

---

### TC-006: Clear Completed Items
**Priority:** Medium  
**Precondition:** List has at least one completed item

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Click "Clear completed" button | All completed items removed |
| 2 | Verify only active items remain | Completed items gone |

---

### TC-007: Data Persistence
**Priority:** High  
**Precondition:** Items have been added to the list

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Add items to list | Items visible |
| 2 | Refresh the page | Items still visible |
| 3 | Verify state preserved | Completed status maintained |

---

### TC-008: Empty State
**Priority:** Low  
**Precondition:** List is empty

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Clear all items | Empty state message appears |
| 2 | Verify message text | "Your shopping list is empty" shown |

---

## Test Environment
- **Browser:** Chromium (via Playwright)
- **Resolution:** 600x800
- **Platform:** Web
- **Server:** Python HTTP server on port 3000

---

## Test Results

| Test Case | Status | Notes |
|-----------|--------|-------|
| TC-001 | **PASSED** | Added "Apples", "Bananas", "Oranges" successfully |
| TC-002 | **PASSED** | Checkbox checked, strikethrough applied, counter updated |
| TC-003 | **PASSED** | "Bananas" deleted successfully via delete button |
| TC-004 | **PASSED** | Active filter shows only uncompleted items |
| TC-005 | **PASSED** | Completed filter shows only completed items |
| TC-006 | **PASSED** | Clear completed removes all checked items |
| TC-007 | **PASSED** | Items persist after page navigation/refresh |
| TC-008 | N/A | Empty state verified at test start |

---

## Test Artifacts

### Screenshots
All screenshots saved to: `tests/screenshots/`
- `web_initial_state_*.png` - Initial empty state
- `web_tc001_*.png` - Add item tests
- `web_tc002_*.png` - Complete item test
- `web_tc003_*.png` - Delete item test
- `web_tc004_*.png` - Active filter test
- `web_tc005_*.png` - Completed filter test
- `web_tc006_*.png` - Clear completed test
- `web_tc007_*.png` - Persistence test

### Video Recording
- `tests/videos/5f8b586e3c4c00f0303e3dd566a25048.webm` (3m 11s)

---

## Summary

**Test Execution Date:** 2026-01-20  
**Total Tests:** 7  
**Passed:** 7  
**Failed:** 0  
**Pass Rate:** 100%

### Notes
- Minor console error (404) for favicon - non-blocking
- All core functionality working as expected
- localStorage persistence confirmed working

---

## Sign-off
- [x] All critical tests passed
- [x] All high-priority tests passed
- [x] No blocking defects found
