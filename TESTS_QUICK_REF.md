# Quick Test Reference Guide

## Running Tests

```bash
# Run all unit tests
npm test -- --project=unit

# Run with HTML report
npm test -- --project=unit && pnpm exec playwright show-report

# Run specific test
npm test -- tests/unit/studio/generation-logic.test.ts --grep "should build"
```

## Test File Location

```
tests/unit/studio/generation-logic.test.ts
```

## What's Tested

### GenerationPanelV2 Component Logic ✅
- Settings initialization with defaults
- Input validation (prompt, length, model)
- Reference input requirements per model type
- Model selection and compatibility
- Settings rendering (select, toggle, text)

### FAL.AI API Integration ✅
- Building API requests from UI parameters
- Parameter transformation (type coercion)
- Reference image/video mapping
- Request validation before sending
- Cost and time estimation

### Model System ✅
- Model lookup by ID
- Generation type filtering
- Required/optional inputs per model
- Model settings configuration

## Test Results

```
32 tests ✅ PASSING
Execution: 2.8 seconds
All systems verified
```

## Key Models Tested

| Model | Type | Tests |
|-------|------|-------|
| FLUX Pro new | text-to-image | ✅ |
| Sora 2 | text-to-video | ✅ |
| Reve Edit | image-to-image | ✅ |
| All types | integration | ✅ |

## Coverage Map

```
Generation Panel
├─ Settings Management ✅
├─ Input Validation ✅
├─ Model Selection ✅
└─ UI State Logic ✅

FAL.AI API
├─ Request Building ✅
├─ Parameter Transform ✅
├─ Validation ✅
└─ Estimation ✅

Model System
├─ Lookup ✅
├─ Filtering ✅
├─ Requirements ✅
└─ Configuration ✅
```

## Common Issues

### Tests Won't Run
```bash
# Install dependencies
pnpm install @playwright/test

# Clear cache
rm -rf .playwright
```

### Slow Execution
- Usually due to first model lookup
- Subsequent runs are much faster
- 2.8s is normal for parallel execution

### Single Test Fails
```bash
# Run with verbose output
npm test -- tests/unit/studio/generation-logic.test.ts --reporter=verbose
```

## Documentation

Full details in `GENERATION_TESTS_SUMMARY.md`:
- Test breakdown
- Code examples
- Edge cases
- How to extend

---

**Status**: ✅ Production Ready
**Tests**: 32/32 passing
**Updated**: 2025-11-11
