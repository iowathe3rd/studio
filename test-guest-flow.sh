#!/bin/bash

echo "Testing Guest User Flow..."
echo "=========================="

# Step 1: Create a guest user
echo -e "\n1. Creating guest user..."
GUEST_RESPONSE=$(curl -s -c /tmp/cookies.txt http://localhost:3000/api/auth/guest)
echo "Guest creation response: $GUEST_RESPONSE"

# Step 2: Try to fetch history with guest cookies
echo -e "\n2. Fetching history with guest session..."
HISTORY_RESPONSE=$(curl -s -b /tmp/cookies.txt http://localhost:3000/api/history)
echo "History response: $HISTORY_RESPONSE"

# Step 3: Check if we can access the main chat page
echo -e "\n3. Accessing main chat page..."
PAGE_RESPONSE=$(curl -s -b /tmp/cookies.txt -o /dev/null -w "%{http_code}" http://localhost:3000/)
echo "Page HTTP status: $PAGE_RESPONSE"

# Cleanup
rm -f /tmp/cookies.txt

echo -e "\n=========================="
echo "Test complete!"
