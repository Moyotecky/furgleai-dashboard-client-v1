# FurgleAI Dashboard Backend - Complete API Specification v2.5.0
**Comprehensive • Production-Ready • Frontend-Driven**

**Last Updated**: 2026-05-25  
**Version**: 2.5.0  
**Base URL**: `https://api.furgleai.com/api`  
**API Format**: REST + JSON  
**Authentication**: Bearer Token (JWT)

---

# TABLE OF CONTENTS
1. [Global Standards](#global-standards)
2. [Authentication (10 endpoints)](#authentication-endpoints)
3. [Repositories (7 endpoints)](#repositories-endpoints)
4. [Vulnerabilities (7 endpoints)](#vulnerabilities-endpoints)
5. [Analytics (6 endpoints)](#analytics-endpoints)
6. [Activity (5 endpoints)](#activity-endpoints)
7. [Error Codes](#error-codes)
8. [Rate Limiting](#rate-limiting)

---

# GLOBAL STANDARDS

## Response Format - Success

```json
{
  "status": "success",
  "code": 200,
  "data": {
    /* All response content nested here */
  },
  "message": "Human-readable message for UI",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

## Response Format - Error

```json
{
  "status": "error",
  "code": 400,
  "data": null,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {
      "field": "value",
      "context": "additional info"
    },
    "validationErrors": [
      {
        "field": "email",
        "message": "Must be valid email",
        "code": "INVALID_FORMAT"
      }
    ]
  },
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

## Standard Headers (All Requests)

```
Content-Type: application/json
Authorization: Bearer {access_token}
Accept: application/json
User-Agent: FurgleAI-Dashboard/{version}
```

## Standard Headers (All Responses)

```
Content-Type: application/json
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1653571087
Cache-Control: no-cache, no-store, must-revalidate
```

## Pagination Standard

Used in all list endpoints:

```json
{
  "data": {
    "items": [ /* array of items */ ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 245,
      "totalPages": 13,
      "hasNextPage": true,
      "hasPreviousPage": false
    },
    "summary": { /* optional aggregate data */ }
  }
}
```

**Query Parameters for Pagination:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 20, max: 100) - Items per page
- `sort` (optional) - Field to sort by (e.g., `sort=createdAt:desc`)
- `filter` (optional) - JSON-encoded filter object

---

# AUTHENTICATION ENDPOINTS

## 1. POST /auth/register

**Summary**: Register new user account  
**Status Code**: 201 Created  
**Rate Limit**: 5 requests per hour per IP  
**Auth Required**: No

### Request Body

```json
{
  "username": "john_doe",
  "email": "john@acme.com",
  "password": "SecureP@ss123",
  "confirmPassword": "SecureP@ss123",
  "firstName": "John",
  "lastName": "Doe",
  "acceptTerms": true
}
```

### Validation Rules

```
username:
  - Required, min 3 chars, max 30 chars
  - Regex: ^[a-zA-Z0-9_-]+$
  - Must be globally unique

email:
  - Required, valid email format
  - Must be globally unique
  - Will receive verification code via email

password:
  - Required, min 8 chars, max 128 chars
  - Must contain: uppercase, lowercase, number, special char
  - Cannot contain username or email

confirmPassword:
  - Must exactly match password field

acceptTerms:
  - Must be true
```

### Success Response (201)

```json
{
  "status": "success",
  "code": 201,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "username": "john_doe",
      "email": "john@acme.com",
      "firstName": "John",
      "lastName": "Doe",
      "emailVerified": false,
      "role": "developer",
      "subscriptionTier": "free",
      "plan": {
        "name": "Free Tier",
        "repositories": 3,
        "storage": "5GB",
        "aiAutopatch": false
      },
      "createdAt": "2026-05-25T21:53:47.265Z",
      "updatedAt": "2026-05-25T21:53:47.265Z",
      "preferences": {
        "notifications": true,
        "emailDigest": "daily",
        "theme": "light"
      },
      "permissions": ["read:repositories", "write:settings"]
    },
    "authentication": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "ref_1234567890_abcdefghijklmnop",
      "tokenType": "Bearer",
      "expiresIn": 3600,
      "expiresAt": "2026-05-25T22:53:47.265Z"
    },
    "verification": {
      "required": true,
      "codeSent": true,
      "codeExpiresIn": 600,
      "email": "john@acme.com",
      "message": "Verification code sent to email"
    }
  },
  "message": "Account created successfully. Check your email for verification code.",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

### Error Response (409 - Email Exists)

```json
{
  "status": "error",
  "code": 409,
  "data": null,
  "error": {
    "code": "EMAIL_ALREADY_EXISTS",
    "message": "Email already registered",
    "details": {
      "email": "john@acme.com",
      "existingSince": "2026-01-10T15:30:00.000Z"
    }
  },
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 2. POST /auth/login

**Summary**: Authenticate user and get tokens  
**Status Code**: 200 OK  
**Rate Limit**: 10 failed attempts per 15 minutes, then locked for 30 mins  
**Auth Required**: No

### Request Body

```json
{
  "email": "john@acme.com",
  "password": "SecureP@ss123",
  "rememberMe": false
}
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "username": "john_doe",
      "email": "john@acme.com",
      "role": "developer",
      "emailVerified": true,
      "subscriptionTier": "pro",
      "lastLogin": "2026-05-24T10:30:00.000Z",
      "lastActivity": "2026-05-25T21:50:00.000Z",
      "preferences": {
        "notifications": true,
        "emailDigest": "daily"
      }
    },
    "authentication": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "ref_1234567890_abcdefghijklmnop",
      "tokenType": "Bearer",
      "expiresIn": 3600,
      "expiresAt": "2026-05-25T22:53:47.265Z"
    },
    "session": {
      "id": "sess_1234567890",
      "createdAt": "2026-05-25T21:53:47.265Z",
      "expiresAt": "2026-05-26T21:53:47.265Z",
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "twoFactorRequired": false
    }
  },
  "message": "Login successful",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

### Error Response (401 - Invalid Credentials)

```json
{
  "status": "error",
  "code": 401,
  "data": null,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Email or password incorrect",
    "details": {
      "attemptsRemaining": 2,
      "accountLocked": false
    }
  },
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 3. POST /auth/verify-email

**Summary**: Verify email with code  
**Status Code**: 200 OK  
**Auth Required**: Optional (works with or without token)

### Request Body

```json
{
  "email": "john@acme.com",
  "code": "123456"
}
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "email": "john@acme.com",
      "emailVerified": true,
      "verifiedAt": "2026-05-25T21:53:47.265Z"
    },
    "verification": {
      "status": "verified",
      "message": "Email verified successfully"
    }
  },
  "message": "Email verified successfully",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 4. POST /auth/resend-verification

**Summary**: Resend verification code  
**Status Code**: 200 OK  
**Rate Limit**: 3 requests per hour per email

### Request Body

```json
{
  "email": "john@acme.com"
}
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "verification": {
      "codeSent": true,
      "codeExpiresIn": 600,
      "email": "john@acme.com"
    }
  },
  "message": "Verification code sent to your email",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 5. POST /auth/forgot-password

**Summary**: Request password reset  
**Status Code**: 200 OK  
**Rate Limit**: 3 requests per hour per email

### Request Body

```json
{
  "email": "john@acme.com"
}
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "reset": {
      "codeSent": true,
      "codeExpiresIn": 1800,
      "email": "john@acme.com",
      "message": "Reset code sent to your email"
    }
  },
  "message": "Password reset email sent",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 6. POST /auth/reset-password

**Summary**: Reset password with code  
**Status Code**: 200 OK

### Request Body

```json
{
  "email": "john@acme.com",
  "code": "abc123def456",
  "newPassword": "NewSecureP@ss123",
  "confirmPassword": "NewSecureP@ss123"
}
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "reset": {
      "status": "completed",
      "email": "john@acme.com",
      "passwordUpdatedAt": "2026-05-25T21:53:47.265Z"
    },
    "message": "Password reset successful. You can now login with your new password."
  },
  "message": "Password reset successfully",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 7. POST /auth/refresh-token

**Summary**: Refresh access token  
**Status Code**: 200 OK  
**Auth Required**: No (uses refresh token)

### Request Body

```json
{
  "refreshToken": "ref_1234567890_abcdefghijklmnop"
}
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "authentication": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "tokenType": "Bearer",
      "expiresIn": 3600,
      "expiresAt": "2026-05-25T22:53:47.265Z"
    }
  },
  "message": "Token refreshed successfully",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 8. POST /auth/logout

**Summary**: Logout user  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Request Body

```json
{
  "sessionId": "sess_1234567890"
}
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "logout": {
      "status": "completed",
      "sessionTerminated": true,
      "message": "Logged out successfully"
    }
  },
  "message": "Logged out successfully",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 9. GET /auth/me

**Summary**: Get current user profile  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "username": "john_doe",
      "email": "john@acme.com",
      "firstName": "John",
      "lastName": "Doe",
      "emailVerified": true,
      "role": "developer",
      "subscriptionTier": "pro",
      "plan": {
        "name": "Professional",
        "repositories": 50,
        "storage": "100GB",
        "aiAutopatch": true,
        "users": 10,
        "monthlyPrice": 29.99,
        "renewalDate": "2026-06-25"
      },
      "createdAt": "2026-01-14T10:00:00.000Z",
      "lastLogin": "2026-05-25T21:50:00.000Z",
      "preferences": {
        "notifications": true,
        "emailDigest": "daily",
        "theme": "light"
      },
      "permissions": [
        "read:repositories",
        "write:repositories",
        "read:vulnerabilities",
        "write:vulnerabilities",
        "read:analytics"
      ]
    }
  },
  "message": "User profile retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 10. PATCH /auth/me

**Summary**: Update user profile  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Request Body

```json
{
  "firstName": "Jonathan",
  "lastName": "Doe",
  "preferences": {
    "theme": "dark",
    "emailDigest": "weekly",
    "notifications": true
  }
}
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "user": {
      "id": "usr_1234567890",
      "firstName": "Jonathan",
      "lastName": "Doe",
      "preferences": {
        "theme": "dark",
        "emailDigest": "weekly",
        "notifications": true
      },
      "updatedAt": "2026-05-25T21:53:47.265Z"
    }
  },
  "message": "Profile updated successfully",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

# REPOSITORIES ENDPOINTS

## 1. GET /repositories

**Summary**: List all connected repositories  
**Status Code**: 200 OK  
**Auth Required**: Yes  
**Rate Limit**: 100 requests per minute

### Query Parameters

```
page=1                          (optional, default: 1)
limit=20                        (optional, default: 20, max: 100)
sort=score:desc                 (optional, default: connectedAt:desc)
filter={"status":"active"}      (optional, JSON-encoded)
search=payments                 (optional, search by name)
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "items": [
      {
        "id": "repo_1234567890",
        "name": "payments-api",
        "slug": "payments-api",
        "description": "Payment processing API",
        "owner": "acme-corp",
        "url": "https://github.com/acme-corp/payments-api",
        "status": "active",
        "score": 82,
        "scoreHistory": [
          { "date": "2026-05-21", "score": 78 },
          { "date": "2026-05-22", "score": 79 },
          { "date": "2026-05-25", "score": 82 }
        ],
        "branch": "main",
        "language": "TypeScript",
        "isPrivate": true,
        "stars": 42,
        "vulnerabilities": {
          "critical": 1,
          "high": 2,
          "medium": 3,
          "low": 5,
          "total": 11
        },
        "lastScan": {
          "timestamp": "3m ago",
          "timestampISO": "2026-05-25T21:50:47.265Z",
          "status": "completed",
          "duration": 245,
          "foundVulnerabilities": 0
        },
        "connectedAt": "2026-01-14T10:00:00.000Z",
        "scanFrequency": "continuous",
        "nextScheduledScan": "2026-05-25T22:00:00.000Z",
        "aiAutopatch": true,
        "webhookEnabled": true,
        "webhookStatus": "active"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 3,
      "totalPages": 1,
      "hasNextPage": false,
      "hasPreviousPage": false
    },
    "summary": {
      "totalRepositories": 3,
      "activeRepositories": 2,
      "scannedToday": 2,
      "averageScore": 81.33,
      "vulnerabilityTotals": {
        "critical": 4,
        "high": 7,
        "medium": 6,
        "low": 8,
        "total": 25
      }
    }
  },
  "message": "Repositories retrieved successfully",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 2. GET /repositories/:slug

**Summary**: Get detailed repository information  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "repository": {
      "id": "repo_1234567890",
      "name": "payments-api",
      "slug": "payments-api",
      "description": "Payment processing API",
      "owner": "acme-corp",
      "url": "https://github.com/acme-corp/payments-api",
      "status": "active",
      "score": 82,
      "scoreHistory": [
        { "date": "2026-05-21", "score": 78 },
        { "date": "2026-05-25", "score": 82 }
      ],
      "branch": "main",
      "language": "TypeScript",
      "isPrivate": true,
      "stars": 42,
      "forks": 8,
      "watchers": 15,
      "vulnerabilities": {
        "critical": 1,
        "high": 2,
        "medium": 3,
        "low": 5,
        "total": 11
      },
      "lastScan": {
        "timestamp": "3m ago",
        "timestampISO": "2026-05-25T21:50:47.265Z",
        "status": "completed",
        "duration": 245,
        "foundVulnerabilities": 0
      },
      "connectedAt": "2026-01-14T10:00:00.000Z",
      "scanFrequency": "continuous",
      "aiAutopatch": true,
      "defaultBranch": "main",
      "createdAt": "2025-06-01T00:00:00.000Z",
      "updatedAt": "2026-05-25T21:50:47.265Z"
    },
    "settings": {
      "id": "repos_1234567890",
      "scanFrequency": "continuous",
      "aiAutopatch": true,
      "webhookEnabled": true,
      "webhookUrl": "https://api.furgleai.com/webhooks/github/repo_1234567890",
      "notificationsEnabled": true,
      "branchProtectionRules": true,
      "autoMergeEnabled": false
    },
    "statistics": {
      "totalScans": 847,
      "successfulScans": 842,
      "failedScans": 5,
      "averageScanDuration": 180,
      "totalVulnerabilitiesFound": 156,
      "totalVulnerabilitiesFixed": 128,
      "fixRate": 82.05
    },
    "team": {
      "admins": 1,
      "developers": 4,
      "viewers": 2
    }
  },
  "message": "Repository details retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 3. GET /repositories/available

**Summary**: List available repositories to connect (from GitHub)  
**Status Code**: 200 OK  
**Auth Required**: Yes  
**Requires**: GitHub OAuth token configured

### Query Parameters

```
page=1
limit=20
sort=stars:desc
search=payment
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "items": [
      {
        "id": "github_xyz",
        "name": "gateway-router",
        "owner": "acme-corp",
        "description": "API gateway routing service",
        "url": "https://github.com/acme-corp/gateway-router",
        "isPrivate": true,
        "stars": 28,
        "language": "Go",
        "createdAt": "2025-03-15T00:00:00.000Z",
        "updatedAt": "2026-05-24T00:00:00.000Z",
        "isConnected": false,
        "lastScanned": null
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "totalPages": 1
    }
  },
  "message": "Available repositories retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 4. POST /repositories/connect

**Summary**: Connect new repository  
**Status Code**: 201 Created  
**Auth Required**: Yes  
**Rate Limit**: 10 per hour

### Request Body

```json
{
  "repositoryId": "github_xyz",
  "branch": "main",
  "scanFrequency": "continuous",
  "aiAutopatch": true
}
```

### Success Response (201)

```json
{
  "status": "success",
  "code": 201,
  "data": {
    "repository": {
      "id": "repo_new123",
      "name": "gateway-router",
      "slug": "gateway-router",
      "status": "initializing",
      "connectedAt": "2026-05-25T21:53:47.265Z",
      "branch": "main"
    },
    "webhook": {
      "id": "webhook_xyz",
      "url": "https://api.furgleai.com/webhooks/github/repo_new123",
      "events": ["push", "pull_request"],
      "active": true,
      "createdAt": "2026-05-25T21:53:47.265Z"
    },
    "scan": {
      "id": "scan_xyz",
      "status": "queued",
      "estimatedCompletionAt": "2026-05-25T21:58:47.265Z",
      "position": 2
    }
  },
  "message": "Repository connected and initial scan queued",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 5. DELETE /repositories/:slug

**Summary**: Disconnect repository  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Request Body (optional)

```json
{
  "deleteHistory": false
}
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "repository": {
      "id": "repo_1234567890",
      "name": "payments-api",
      "status": "disconnected",
      "disconnectedAt": "2026-05-25T21:53:47.265Z"
    },
    "webhook": {
      "id": "webhook_xyz",
      "deleted": true,
      "deletedAt": "2026-05-25T21:53:47.265Z"
    }
  },
  "message": "Repository disconnected successfully",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 6. PATCH /repositories/:slug

**Summary**: Update repository settings  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Request Body

```json
{
  "scanFrequency": "weekly",
  "aiAutopatch": false,
  "notificationsEnabled": true,
  "branch": "main"
}
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "repository": {
      "id": "repo_1234567890",
      "name": "payments-api",
      "scanFrequency": "weekly",
      "aiAutopatch": false,
      "notificationsEnabled": true,
      "branch": "main",
      "updatedAt": "2026-05-25T21:53:47.265Z"
    }
  },
  "message": "Repository settings updated",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 7. POST /repositories/:slug/scan

**Summary**: Trigger manual scan  
**Status Code**: 202 Accepted  
**Auth Required**: Yes  
**Rate Limit**: 5 per hour per repo

### Request Body (optional)

```json
{
  "depth": "full",
  "includeSecrets": true
}
```

### Success Response (202)

```json
{
  "status": "success",
  "code": 202,
  "data": {
    "scan": {
      "id": "scan_123abc",
      "repositorySlug": "payments-api",
      "status": "in_progress",
      "progress": {
        "stage": "analyzing_dependencies",
        "percentage": 12
      },
      "startedAt": "2026-05-25T21:53:47.265Z",
      "estimatedCompletionAt": "2026-05-25T22:10:00.000Z"
    }
  },
  "message": "Manual scan started",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

# VULNERABILITIES ENDPOINTS

## 1. GET /vulnerabilities

**Summary**: List all vulnerabilities  
**Status Code**: 200 OK  
**Auth Required**: Yes  
**Rate Limit**: 100 requests per minute

### Query Parameters

```
page=1
limit=20
sort=severity:desc,createdAt:desc
filter={"status":"READY_TO_FIX","severity":"critical"}
search=sql
severity=critical,high
status=READY_TO_FIX,FIX_GENERATED
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "items": [
      {
        "id": "vuln_1234567890",
        "severity": "critical",
        "title": "SQL Injection in user lookup",
        "status": "READY_TO_FIX",
        "source": "Live Scan",
        "sourceDetails": {
          "tool": "SAST",
          "scanId": "scan_xyz",
          "scanDate": "2026-05-25T21:50:47.265Z"
        },
        "file": "src/api/payments.ts",
        "lineNumber": 45,
        "lineOfCode": "const query = `SELECT * FROM users WHERE id = ${userId}`;",
        "description": "Unsanitized user input directly concatenated in SQL query allows attackers to execute arbitrary SQL commands",
        "attackPath": [
          "Attacker sends malicious userId parameter",
          "Parameter passed directly to SQL query without sanitization",
          "Unauthorized database access or data exfiltration possible"
        ],
        "codeSegment": {
          "before": "const query = `SELECT * FROM users WHERE id = ${userId}`; db.query(query);",
          "after": "const query = 'SELECT * FROM users WHERE id = $1'; db.query(query, [userId]);"
        },
        "patchCode": "const query = 'SELECT * FROM users WHERE id = $1'; db.query(query, [userId]);",
        "confidence": 94,
        "cwe": {
          "id": "CWE-89",
          "title": "Improper Neutralization of Special Elements used in an SQL Command",
          "url": "https://cwe.mitre.org/data/definitions/89.html"
        },
        "cvss": {
          "version": "3.1",
          "score": 9.8,
          "severity": "CRITICAL",
          "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
        },
        "tags": ["injection", "database", "critical", "owasp-a03"],
        "repoSlug": "payments-api",
        "discoveredAt": "2026-05-25T21:50:47.265Z",
        "updatedAt": "2026-05-25T21:51:00.000Z",
        "fixStatus": {
          "fixGenerated": false,
          "prCreated": false,
          "approved": false
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "totalPages": 3,
      "hasNextPage": true
    },
    "summary": {
      "totalVulnerabilities": 45,
      "byStatus": {
        "READY_TO_FIX": 8,
        "FIX_GENERATING": 2,
        "FIX_GENERATED": 6,
        "PR_CREATED": 5,
        "MANUAL_REVIEW": 14,
        "BLOCKED": 10
      },
      "bySeverity": {
        "critical": 4,
        "high": 12,
        "medium": 18,
        "low": 11
      },
      "fixAutomationRate": 83
    }
  },
  "message": "Vulnerabilities retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 2. GET /vulnerabilities/:id

**Summary**: Get detailed vulnerability  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "vulnerability": {
      "id": "vuln_1234567890",
      "severity": "critical",
      "title": "SQL Injection in user lookup",
      "status": "READY_TO_FIX",
      "source": "Live Scan",
      "file": "src/api/payments.ts",
      "lineNumber": 45,
      "description": "Unsanitized user input directly concatenated in SQL query",
      "fullDescription": "The application constructs SQL queries by concatenating user-supplied input without proper sanitization or parameterization. This allows an attacker to inject arbitrary SQL commands, potentially leading to unauthorized data access, modification, or deletion.",
      "attackPath": [
        "Attacker sends malicious input: ' OR '1'='1",
        "Input concatenated directly into SQL query",
        "Database executes attacker's SQL commands",
        "Attacker can read, modify, or delete data"
      ],
      "codeSegment": {
        "before": "const query = `SELECT * FROM users WHERE id = ${userId}`; db.query(query);",
        "after": "const query = 'SELECT * FROM users WHERE id = $1'; db.query(query, [userId]);"
      },
      "patchCode": "const query = 'SELECT * FROM users WHERE id = $1'; db.query(query, [userId]);",
      "confidence": 94,
      "cwe": { "id": "CWE-89", "title": "SQL Injection" },
      "cvss": { "score": 9.8, "severity": "CRITICAL" },
      "references": [
        "https://owasp.org/www-community/attacks/SQL_Injection",
        "https://cwe.mitre.org/data/definitions/89.html"
      ],
      "repoSlug": "payments-api",
      "tags": ["injection", "database", "critical"],
      "history": [
        {
          "timestamp": "2026-05-25T21:50:47.265Z",
          "action": "discovered",
          "details": "Found during live scan"
        }
      ],
      "fixStatus": {
        "fixGenerated": false,
        "fixGeneratedAt": null,
        "prCreated": false,
        "prUrl": null,
        "approved": false,
        "approvedAt": null,
        "dismissed": false,
        "dismissedReason": null
      },
      "relatedVulnerabilities": [
        {
          "id": "vuln_9876543210",
          "title": "Similar SQL Injection in order lookup",
          "file": "src/api/orders.ts",
          "lineNumber": 82
        }
      ]
    }
  },
  "message": "Vulnerability details retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 3. GET /repositories/:slug/vulnerabilities

**Summary**: Get vulnerabilities for specific repo  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "repository": {
      "slug": "payments-api",
      "name": "payments-api"
    },
    "items": [
      /* Same vulnerability objects as /vulnerabilities */
    ],
    "pagination": { /* pagination object */ },
    "summary": {
      "totalVulnerabilities": 11,
      "bySeverity": {
        "critical": 1,
        "high": 2,
        "medium": 3,
        "low": 5
      },
      "byStatus": {
        "READY_TO_FIX": 3,
        "FIX_GENERATED": 2,
        "PR_CREATED": 1,
        "BLOCKED": 5
      }
    }
  },
  "message": "Repository vulnerabilities retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 4. POST /vulnerabilities/:id/fix

**Summary**: Trigger AI fix generation  
**Status Code**: 202 Accepted  
**Auth Required**: Yes  
**Rate Limit**: 20 per hour per repo

### Request Body (optional)

```json
{
  "preferredApproach": "parameterized_queries",
  "additionalContext": "Use prepared statements with the current db library"
}
```

### Success Response (202)

```json
{
  "status": "success",
  "code": 202,
  "data": {
    "vulnerability": {
      "id": "vuln_1234567890",
      "status": "FIX_GENERATING",
      "title": "SQL Injection in user lookup"
    },
    "fix": {
      "id": "fix_1234567890",
      "vulnerabilityId": "vuln_1234567890",
      "status": "generating",
      "progress": {
        "stage": "analyzing_vulnerability",
        "percentage": 10,
        "estimatedTimeRemaining": 45
      },
      "startedAt": "2026-05-25T21:53:47.265Z",
      "estimatedCompletionAt": "2026-05-25T21:55:00.000Z",
      "stages": [
        { "name": "Analyzing vulnerability", "status": "in_progress" },
        { "name": "Generating patch", "status": "pending" },
        { "name": "Testing fix", "status": "pending" },
        { "name": "Creating PR", "status": "pending" }
      ]
    }
  },
  "message": "Fix generation started",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 5. GET /vulnerabilities/:id/fix/status

**Summary**: Check fix generation status  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "fix": {
      "id": "fix_1234567890",
      "vulnerabilityId": "vuln_1234567890",
      "status": "completed",
      "progress": {
        "stage": "ready_to_review",
        "percentage": 100
      },
      "startedAt": "2026-05-25T21:53:47.265Z",
      "completedAt": "2026-05-25T21:55:12.000Z",
      "totalDuration": 85,
      "result": {
        "patchCode": "const query = 'SELECT * FROM users WHERE id = $1'; db.query(query, [userId]);",
        "explanation": "Use parameterized queries to safely include user input",
        "confidence": 94,
        "testsPassed": true,
        "readyForReview": true
      }
    }
  },
  "message": "Fix generation completed",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 6. POST /vulnerabilities/:id/approve-fix

**Summary**: Create PR with generated fix  
**Status Code**: 201 Created  
**Auth Required**: Yes

### Request Body

```json
{
  "fixId": "fix_1234567890",
  "prTitle": "Fix: SQL injection in user lookup",
  "autoMerge": false,
  "reviewers": ["senior-dev@acme.com"]
}
```

### Success Response (201)

```json
{
  "status": "success",
  "code": 201,
  "data": {
    "vulnerability": {
      "id": "vuln_1234567890",
      "status": "PR_CREATED"
    },
    "pullRequest": {
      "id": "pr_1234567890",
      "number": 2847,
      "title": "Fix: SQL injection in user lookup",
      "url": "https://github.com/acme-corp/payments-api/pull/2847",
      "state": "open",
      "createdAt": "2026-05-25T21:55:30.000Z",
      "createdBy": "furgleai-bot",
      "description": "This PR fixes a critical SQL injection vulnerability...",
      "reviewers": ["senior-dev@acme.com"],
      "autoMergeEnabled": false
    }
  },
  "message": "Pull request created successfully",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 7. POST /vulnerabilities/:id/dismiss

**Summary**: Dismiss vulnerability  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Request Body

```json
{
  "reason": "false_positive",
  "explanation": "This is legacy code not in production",
  "dismissedUntil": "2026-06-25T21:53:47.265Z"
}
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "vulnerability": {
      "id": "vuln_1234567890",
      "status": "DISMISSED",
      "dismissedAt": "2026-05-25T21:53:47.265Z",
      "dismissedBy": "john_doe",
      "dismissReason": "false_positive",
      "dismissExplanation": "This is legacy code not in production",
      "dismissedUntil": "2026-06-25T21:53:47.265Z"
    }
  },
  "message": "Vulnerability dismissed",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

# ANALYTICS ENDPOINTS

## 1. GET /analytics/overview

**Summary**: Dashboard overview metrics  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "summary": {
      "totalRepositories": 3,
      "activeRepositories": 2,
      "averageSecurityScore": 81.33,
      "scoreChangePercent": 2.5,
      "scoreChangeDirection": "up"
    },
    "vulnerabilities": {
      "total": 45,
      "critical": 4,
      "high": 12,
      "medium": 18,
      "low": 11,
      "newThisWeek": 3,
      "fixedThisWeek": 2
    },
    "performance": {
      "fixAutomationRate": 83,
      "prsCreatedThisWeek": 7,
      "prsMergedThisWeek": 5,
      "averageTimeToFix": "1.2 days",
      "scanSuccessRate": 99.4
    },
    "trends": {
      "vulnerabilityTrendThisWeek": {
        "direction": "down",
        "percentChange": -5,
        "data": [
          { "date": "2026-05-21", "count": 47 },
          { "date": "2026-05-25", "count": 45 }
        ]
      },
      "scoreChange": "+2.5 points"
    },
    "topRepositories": [
      {
        "slug": "payments-api",
        "name": "payments-api",
        "score": 82,
        "vulnerabilities": 11,
        "newVulnerabilities": 0
      }
    ],
    "recentActivity": [
      {
        "timestamp": "10m ago",
        "action": "Vulnerability fixed",
        "description": "SQL injection in order lookup"
      }
    ]
  },
  "message": "Overview retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 2. GET /analytics/risk-trend

**Summary**: Security risk trend over time  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Query Parameters

```
period=week          (week, month, quarter, year)
granularity=day      (day, week, month)
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "period": {
      "start": "2026-05-18T00:00:00.000Z",
      "end": "2026-05-25T23:59:59.999Z",
      "granularity": "day"
    },
    "trend": [
      {
        "date": "2026-05-18",
        "timestamp": "2026-05-18T00:00:00.000Z",
        "vulnerabilities": {
          "critical": 5,
          "high": 14,
          "medium": 20,
          "low": 12,
          "total": 51
        },
        "averageScore": 79.2,
        "scanCount": 12,
        "newVulnerabilities": 4,
        "fixedVulnerabilities": 1
      },
      {
        "date": "2026-05-25",
        "timestamp": "2026-05-25T23:59:59.999Z",
        "vulnerabilities": {
          "critical": 4,
          "high": 12,
          "medium": 18,
          "low": 11,
          "total": 45
        },
        "averageScore": 81.33,
        "scanCount": 15,
        "newVulnerabilities": 0,
        "fixedVulnerabilities": 2
      }
    ],
    "summary": {
      "totalVulnerabilitiesRemoved": 6,
      "totalVulnerabilitiesAdded": 0,
      "scoreImprovement": 2.13,
      "trend": "improving"
    }
  },
  "message": "Risk trend retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 3. GET /analytics/repositories

**Summary**: Repository statistics and metrics  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "items": [
      {
        "slug": "payments-api",
        "name": "payments-api",
        "score": 82,
        "scoreHistory": [
          { "date": "2026-05-21", "score": 78 },
          { "date": "2026-05-25", "score": 82 }
        ],
        "vulnerabilities": {
          "critical": 1,
          "high": 2,
          "medium": 3,
          "low": 5,
          "total": 11
        },
        "statistics": {
          "totalScans": 847,
          "successRate": 99.4,
          "averageScanDuration": 180,
          "lastScan": "2026-05-25T21:50:47.265Z",
          "nextScan": "2026-05-25T22:00:00.000Z"
        },
        "fixes": {
          "total": 128,
          "thisWeek": 2,
          "automationRate": 83
        },
        "contributors": 4
      }
    ],
    "summary": {
      "averageScore": 81.33,
      "totalRepositories": 3,
      "highRiskRepositories": 0,
      "improvingRepositories": 2
    }
  },
  "message": "Repository analytics retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 4. GET /analytics/team

**Summary**: Team collaboration metrics  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "team": {
      "totalMembers": 7,
      "activeThisWeek": 5,
      "roles": {
        "admin": 1,
        "developer": 4,
        "viewer": 2
      }
    },
    "members": [
      {
        "id": "usr_123",
        "name": "John Doe",
        "email": "john@acme.com",
        "role": "developer",
        "joinedAt": "2026-01-14T10:00:00.000Z",
        "lastActivity": "2026-05-25T21:50:00.000Z",
        "statistics": {
          "prsApproved": 12,
          "vulnerabilitiesFixed": 5,
          "fixes": 8
        }
      }
    ],
    "activity": {
      "totalPRsThisWeek": 7,
      "totalMergesThisWeek": 5,
      "averageReviewTime": "4 hours",
      "topContributor": "john_doe"
    }
  },
  "message": "Team analytics retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 5. GET /analytics/ai-execution

**Summary**: AI fix generation metrics  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "summary": {
      "totalFixesGenerated": 128,
      "fixesThisWeek": 7,
      "automationRate": 83,
      "averageGenerationTime": "2.3 minutes"
    },
    "byStatus": {
      "READY_TO_FIX": 8,
      "FIX_GENERATING": 2,
      "FIX_GENERATED": 6,
      "PR_CREATED": 5,
      "MERGED": 107
    },
    "successMetrics": {
      "generationSuccessRate": 94.5,
      "testPassRate": 91.2,
      "prMergeRate": 85.3,
      "averageConfidence": 87.4
    },
    "trends": {
      "generationTimeImprovement": -12,
      "successRateImprovement": 2.1,
      "automationRateIncrease": 3.5
    },
    "topPerformers": [
      {
        "vulnerabilityType": "SQL Injection",
        "fixSuccessRate": 96,
        "count": 12
      }
    ]
  },
  "message": "AI execution metrics retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 6. GET /analytics/dependencies

**Summary**: Dependency and supply chain metrics  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "summary": {
      "totalDependencies": 347,
      "outdatedDependencies": 23,
      "vulnerableDependencies": 8,
      "securityScore": 81
    },
    "trends": [
      {
        "date": "2026-05-25",
        "totalDependencies": 347,
        "outdated": 23,
        "vulnerable": 8
      }
    ],
    "riskByRepository": [
      {
        "slug": "payments-api",
        "totalDependencies": 145,
        "vulnerableDependencies": 3,
        "riskLevel": "medium"
      }
    ],
    "topVulnerablePackages": [
      {
        "name": "lodash",
        "version": "4.17.19",
        "severity": "high",
        "cve": "CVE-2021-23337",
        "affectedRepositories": 2
      }
    ]
  },
  "message": "Dependency analytics retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

# ACTIVITY ENDPOINTS

## 1. GET /repositories/:slug/activity

**Summary**: Repository event log  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Query Parameters

```
page=1
limit=50
type=scan_completed,vulnerability_found
sort=timestamp:desc
```

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "repository": {
      "slug": "payments-api",
      "name": "payments-api"
    },
    "items": [
      {
        "id": "event_1234567890",
        "timestamp": "10 mins ago",
        "timestampISO": "2026-05-25T21:43:47.265Z",
        "type": "scan_completed",
        "title": "Live Scan Completed",
        "description": "Repository scanned for vulnerabilities",
        "severity": "info",
        "initiator": {
          "type": "ai",
          "name": "FurgleAI Automation",
          "id": "sys_auto"
        },
        "impact": {
          "type": "vulnerabilities",
          "value": 0,
          "label": "No new vulnerabilities found"
        },
        "details": {
          "scanId": "scan_abc123",
          "duration": 245,
          "filesScanned": 1247,
          "linesOfCode": 45623
        },
        "status": "success"
      },
      {
        "id": "event_0987654321",
        "timestamp": "2 hours ago",
        "type": "vulnerability_found",
        "title": "New Vulnerability Detected",
        "description": "SQL Injection in user lookup",
        "severity": "critical",
        "initiator": {
          "type": "ai",
          "name": "FurgleAI Automation"
        },
        "impact": {
          "type": "vulnerabilities",
          "value": 1
        },
        "details": {
          "vulnerabilityId": "vuln_1234567890",
          "file": "src/api/payments.ts",
          "line": 45
        },
        "status": "success"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 347,
      "totalPages": 7,
      "hasNextPage": true
    },
    "summary": {
      "totalEvents": 347,
      "byType": {
        "scan_completed": 156,
        "fix_merged": 45,
        "vulnerability_found": 89,
        "pr_created": 32,
        "push_detected": 25
      },
      "byStatus": {
        "success": 342,
        "failed": 5
      }
    }
  },
  "message": "Activity retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 2. GET /repositories/:slug/secrets

**Summary**: Exposed secrets and credentials  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "repository": {
      "slug": "payments-api",
      "name": "payments-api"
    },
    "items": [
      {
        "id": "secret_1234567890",
        "type": "api_key",
        "pattern": "AWS Access Key",
        "file": "src/config/aws.ts",
        "lineNumber": 12,
        "severity": "critical",
        "exposed": true,
        "foundAt": "2026-05-24T15:30:00.000Z",
        "status": "remediated",
        "remediedAt": "2026-05-24T16:00:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "exposed": 0,
      "remediated": 1
    }
  },
  "message": "Secrets retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 3. GET /repositories/:slug/workflows

**Summary**: CI/CD workflows and integrations  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "repository": {
      "slug": "payments-api",
      "name": "payments-api"
    },
    "items": [
      {
        "id": "wf_1234567890",
        "name": "Security Scan",
        "provider": "github_actions",
        "status": "active",
        "lastRun": {
          "timestamp": "2026-05-25T21:50:00.000Z",
          "status": "success",
          "duration": 245
        },
        "schedule": "On every push to main",
        "config": {
          "triggers": ["push", "pull_request"],
          "branches": ["main"]
        }
      }
    ]
  },
  "message": "Workflows retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 4. GET /repositories/:slug/live-scan

**Summary**: Real-time scan status and progress  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "repository": {
      "slug": "payments-api",
      "name": "payments-api"
    },
    "scanStatus": {
      "currentScan": {
        "id": "scan_live123",
        "status": "in_progress",
        "startedAt": "2026-05-25T21:50:00.000Z",
        "estimatedCompletionAt": "2026-05-25T21:55:00.000Z",
        "progress": {
          "stage": "analyzing_dependencies",
          "percentage": 45,
          "currentFile": "package.json",
          "filesProcessed": 567,
          "filesRemaining": 680
        },
        "findings": {
          "vulnerabilities": 1,
          "secrets": 0,
          "codeQuality": 3
        }
      },
      "previousScans": [
        {
          "id": "scan_prev456",
          "status": "completed",
          "startedAt": "2026-05-25T21:30:00.000Z",
          "completedAt": "2026-05-25T21:35:00.000Z",
          "vulnerabilities": 0
        }
      ]
    }
  },
  "message": "Live scan status retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

## 5. GET /repositories/:slug/pull-requests

**Summary**: Security-related PRs  
**Status Code**: 200 OK  
**Auth Required**: Yes

### Success Response (200)

```json
{
  "status": "success",
  "code": 200,
  "data": {
    "repository": {
      "slug": "payments-api",
      "name": "payments-api"
    },
    "items": [
      {
        "id": "pr_1234567890",
        "number": 2847,
        "title": "Fix: SQL injection in user lookup",
        "description": "This PR fixes a critical SQL injection vulnerability found by FurgleAI...",
        "url": "https://github.com/acme-corp/payments-api/pull/2847",
        "state": "open",
        "createdAt": "2026-05-25T21:55:30.000Z",
        "updatedAt": "2026-05-25T21:56:00.000Z",
        "createdBy": "furgleai-bot",
        "relatedVulnerability": {
          "id": "vuln_1234567890",
          "title": "SQL Injection in user lookup"
        },
        "reviewStatus": "pending",
        "reviewers": ["senior-dev@acme.com"],
        "approvals": 0,
        "requestedChanges": 0,
        "comments": 0,
        "commits": 1
      }
    ],
    "pagination": {
      "total": 5,
      "open": 2,
      "merged": 2,
      "closed": 1
    }
  },
  "message": "Pull requests retrieved",
  "timestamp": "2026-05-25T21:53:47.265Z"
}
```

---

# ERROR CODES

## HTTP Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created |
| 202 | Accepted | Async operation queued |
| 204 | No Content | Successful delete |
| 400 | Bad Request | Invalid input/validation error |
| 401 | Unauthorized | Missing/invalid auth token |
| 403 | Forbidden | Authenticated but no permission |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists |
| 429 | Too Many Requests | Rate limited |
| 500 | Internal Server Error | Server error |

## Error Code Reference

### Authentication Errors

```json
{
  "INVALID_CREDENTIALS": "Email or password incorrect",
  "EMAIL_ALREADY_EXISTS": "Email already registered",
  "INVALID_EMAIL_FORMAT": "Email format is invalid",
  "PASSWORD_WEAK": "Password does not meet requirements",
  "CODE_EXPIRED": "Verification code expired",
  "INVALID_CODE": "Verification code is invalid",
  "USER_NOT_FOUND": "User account not found",
  "ACCOUNT_LOCKED": "Account locked due to too many login attempts",
  "EMAIL_NOT_VERIFIED": "Please verify your email first",
  "TOKEN_EXPIRED": "Access token expired",
  "INVALID_TOKEN": "Access token is invalid",
  "REFRESH_TOKEN_EXPIRED": "Refresh token expired"
}
```

### Repository Errors

```json
{
  "REPOSITORY_NOT_FOUND": "Repository not found",
  "REPOSITORY_ALREADY_CONNECTED": "Repository already connected",
  "INVALID_REPOSITORY": "Invalid repository",
  "GITHUB_AUTH_REQUIRED": "GitHub authentication required",
  "GITHUB_API_ERROR": "GitHub API error",
  "WEBHOOK_CREATION_FAILED": "Failed to create webhook",
  "INVALID_BRANCH": "Branch does not exist",
  "SCAN_IN_PROGRESS": "A scan is already in progress"
}
```

### Vulnerability Errors

```json
{
  "VULNERABILITY_NOT_FOUND": "Vulnerability not found",
  "INVALID_SEVERITY": "Invalid severity level",
  "FIX_GENERATION_FAILED": "Failed to generate fix",
  "PR_CREATION_FAILED": "Failed to create pull request",
  "ALREADY_DISMISSED": "Vulnerability already dismissed"
}
```

### General Errors

```json
{
  "INVALID_REQUEST": "Invalid request format",
  "VALIDATION_ERROR": "Input validation failed",
  "UNAUTHORIZED": "Unauthorized access",
  "FORBIDDEN": "Access forbidden",
  "RATE_LIMITED": "Too many requests",
  "SERVER_ERROR": "Internal server error"
}
```

---

# RATE LIMITING

## Rate Limit Headers

All responses include:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1653571087
```

## Rate Limits by Endpoint Type

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Authentication | Varies (see per endpoint) | Per IP/Email |
| List endpoints | 100 req/min | Per user |
| Write endpoints | 20 req/min | Per user |
| Scan trigger | 5 per hour per repo | Per repo |
| Fix generation | 20 per hour per repo | Per repo |
| Analytics | 100 req/min | Per user |

---

# WEBHOOK EVENTS

Webhooks sent to repositories' configured webhook URL:

```json
{
  "event": "scan.completed",
  "timestamp": "2026-05-25T21:53:47.265Z",
  "repository": {
    "id": "repo_1234567890",
    "slug": "payments-api"
  },
  "data": {
    "scanId": "scan_abc123",
    "status": "completed",
    "duration": 245,
    "vulnerabilitiesFound": 0
  },
  "signature": "sha256=..."
}
```

---

# IMPLEMENTATION CHECKLIST

- [x] 35+ REST API endpoints fully specified
- [x] All responses nest data in `data` object/array
- [x] Complete request/response examples for every endpoint
- [x] Full validation rules documented
- [x] Error codes with all error scenarios
- [x] Rate limiting standards defined
- [x] Pagination standards with metadata
- [x] Authentication & authorization patterns
- [x] Webhook structure defined
- [x] HTTP status codes mapped
- [x] Standard headers documented

---

**This specification is production-ready and 100% frontend-complete.**
**All responses follow the frontend's expected data structure with complete nesting in `data` object.**

