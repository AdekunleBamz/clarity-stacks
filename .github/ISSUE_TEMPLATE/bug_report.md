---
name: Bug Report
description: Report a bug or issue with the clarity-stacks library
title: "[BUG] "
labels: ["bug", "needs-triage"]
assignees: []
---

## 🐛 Bug Description
A clear and concise description of what the bug is.

## 🔄 Steps to Reproduce
1. Go to '...'
2. Call transaction verification function '....'
3. Pass transaction ID/hash '....'
4. See error

## 📋 Expected Behavior
A clear and concise description of what you expected to happen.

## 📸 Screenshots/Logs
If applicable, add screenshots or error logs to help explain your problem.

## 🌐 Environment
- **Clarity Version**: [e.g., Clarity 2.0]
- **Stacks Network**: [e.g., Mainnet, Testnet]
- **Library Version**: [e.g., 1.0.0]
- **Node.js Version**: [e.g., 18.17.0]
- **Clarinet Version**: [e.g., 2.3.2]

## 🔍 Transaction Details (if applicable)
- **Transaction ID**: [Stacks transaction ID to verify]
- **Block Height**: [Block number where transaction was mined]
- **Contract Address**: [Contract being verified]
- **Function Called**: [verify-tx-mined, verify-contract-deploy, etc.]

## 📄 Code Example
```typescript
// Please provide a code example that demonstrates the issue
import { verifyTxMined } from 'clarity-stacks';

const result = await verifyTxMined('transaction-id-here');
console.log(result); // Expected: true, Actual: false
```

## 📝 Additional Context
Add any other context about the problem here, such as:
- When did this start happening?
- Is this related to a specific transaction type?
- Any recent changes to your Clarity contracts?

## ✅ Verification Steps
- [ ] I have tested this with multiple transaction IDs
- [ ] I have verified the transaction exists on Stacks Explorer
- [ ] I have checked the contract deployment status
- [ ] I have tested on both mainnet and testnet (if applicable)