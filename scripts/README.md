# Testing Scripts

Automated testing scripts for fal.ai SDK integration.

## Scripts

### 1. Integration Test (`test-fal-integration.ts`)

Comprehensive test of all FalClient and StudioService methods.

```bash
tsx scripts/test-fal-integration.ts
```

**Tests:**
- ✅ FalClient.submit() - Queue job submission
- ✅ FalClient.getStatus() - Status checking with logs
- ✅ FalClient.getResult() - Result retrieval
- ✅ FalClient.run() - End-to-end generation with polling
- ✅ StudioService.runGeneration() - Full generation flow with progress
- ✅ Error handling - Invalid models, request IDs

**Duration:** ~2-3 minutes (includes actual image generation)

### 2. Model Test (`test-model.ts`)

Quick test of specific fal.ai models.

```bash
# List available models
tsx scripts/test-model.ts --list

# Test specific model
tsx scripts/test-model.ts <model-key>
```

**Available Models:**

| Key | Model | Type | Duration |
|-----|-------|------|----------|
| `flux-schnell` | FLUX Schnell | Image | 5-10s |
| `flux-dev` | FLUX Dev | Image | 15-30s |
| `flux-pro` | FLUX Pro | Image | 20-40s |
| `veo-2` | Veo 2 | Video | 30-60s |
| `minimax-video` | MiniMax Video-01 | Video | 30-90s |

**Examples:**
```bash
# Fast image generation test
tsx scripts/test-model.ts flux-schnell

# Video generation test
tsx scripts/test-model.ts veo-2
```

## Prerequisites

### Environment Variables
```bash
# Required
FAL_API_KEY=your-fal-api-key

# Optional (for full integration tests)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Install Dependencies
```bash
pnpm install
```

## Expected Output

### Integration Test
```
====================================================================
Testing FalClient
====================================================================

1. Testing submit()...
✓ Submitted: abc123def456

2. Testing getStatus()...
✓ Status: IN_PROGRESS

3. Polling for completion...
  Processing image...
  Status: IN_PROGRESS
  Generating output...
  Status: COMPLETED
✓ Generation completed!

4. Testing getResult()...
✓ Image generated: https://v3.fal.media/files/abc123.png
  Size: 1024x768
  Inference time: 3.2s

✓ FalClient tests completed

====================================================================
Test Summary
====================================================================
✓ All tests passed (3/3)
```

### Model Test
```
Testing: FLUX Schnell (Fast Image Generation)
============================================================
Expected duration: 5-10 seconds

[0.5s] Status: IN_QUEUE
[2.0s] Status: IN_PROGRESS
  Processing image...
[5.2s] Status: COMPLETED

✓ Generation completed in 5.2s

Generated Images:
  [1] https://v3.fal.media/files/abc123.png
      Size: 1024x576

Timings:
  Inference: 3.8s

Seed: 1234567890

✓ Test passed!
```

## Troubleshooting

### Error: FAL_API_KEY not set
```bash
# Add to .env.local
echo "FAL_API_KEY=your-api-key" >> .env.local

# Or export in shell
export FAL_API_KEY=your-api-key
```

### Error: Cannot find module
```bash
# Make sure dependencies are installed
pnpm install

# Verify tsx is available
npx tsx --version
```

### Error: Generation timeout
- Default timeout: 10 minutes
- Video generations take longer than images
- Check fal.ai status: https://status.fal.ai

### Error: Invalid API key
- Verify key is correct: https://fal.ai/dashboard/keys
- Ensure no extra spaces or newlines
- Check key permissions (should have generation access)

## CI/CD Integration

### GitHub Actions
```yaml
- name: Test fal.ai Integration
  env:
    FAL_API_KEY: ${{ secrets.FAL_API_KEY }}
  run: tsx scripts/test-fal-integration.ts
```

### Local Pre-commit Hook
```bash
# .git/hooks/pre-commit
#!/bin/bash
tsx scripts/test-fal-integration.ts || exit 1
```

## Performance Benchmarks

Run benchmarks for all models:
```bash
for model in flux-schnell flux-dev veo-2; do
  echo "Testing $model..."
  time tsx scripts/test-model.ts $model
done
```

## Next Steps

After scripts pass:
1. ✅ Test in development environment
2. ⏳ Test in staging environment
3. ⏳ Load testing (concurrent generations)
4. ⏳ Production deployment with monitoring

## Support

- **fal.ai Documentation:** https://docs.fal.ai
- **SDK Issues:** https://github.com/fal-ai/fal-js/issues
- **Project Issues:** File in this repository

---

**Last Updated:** November 6, 2025
**SDK Version:** @fal-ai/client v1.7.2
