# VdoCipher Secure Backend for Mighty Networks

This backend generates short-lived (10 minute) OTP tokens for VdoCipher playback.

## 🔒 Security Features
- OTP expires every 10 minutes
- Device limit (1 device per user)
- IP locking
- Tokens refresh every 8 minutes
- Works with Mighty Networks using watch.html links
- Built for Render hosting

---

# 🚀 Deployment Instructions

## 1. Add API Secret on Render
Environment variable:
