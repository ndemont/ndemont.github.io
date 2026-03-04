#!/bin/bash
# Simple local server for Spin Doctor
# Usage: ./serve.sh

PORT=8000

echo "🎡 Starting Spin Doctor on http://localhost:$PORT"
echo "Press Ctrl+C to stop"
echo ""

python3 -m http.server $PORT --directory .
