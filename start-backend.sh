#!/bin/bash
cd /c/Users/User/Desktop/vip-carwash-crm/backend
exec python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
