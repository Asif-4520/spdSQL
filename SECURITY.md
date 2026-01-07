# Security Policy

## Reporting a Vulnerability

We take the security of SQLio seriously. If you have discovered a security vulnerability, please report it to us responsibly.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by:

1. **Email**: Send details to the repository owner
2. **GitHub Security Advisories**: Use the [Security Advisories](https://github.com/Asif-4520/SQLio/security/advisories) feature
3. **Private vulnerability report**: Click "Report a vulnerability" in the Security tab

### What to Include

Please include the following information in your report:

- Type of vulnerability
- Step-by-step instructions to reproduce the issue
- Potential impact of the vulnerability
- Suggested fix (if you have one)
- Your contact information for follow-up

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: Within 7 days
  - High: Within 30 days
  - Medium: Within 60 days
  - Low: Within 90 days

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | ✅ Yes             |
| < Latest| ❌ No              |

We only provide security updates for the latest version. Please update to the latest version to receive security patches.

## Security Best Practices

### For Users

When using SQLio:

- Always use the latest version
- Be cautious when importing data from untrusted sources
- Review imported SQL queries before execution
- Use HTTPS when deploying
- Keep your browser updated

### For Contributors

When contributing to SQLio:

- Never commit secrets, API keys, or credentials
- Sanitize user inputs
- Validate all data before processing
- Follow secure coding practices
- Run security scans before submitting PRs
- Use parameterized queries
- Implement proper error handling
- Follow the principle of least privilege

## Known Security Considerations

### Browser-Based Execution

SQLio runs entirely in the browser using WebAssembly:

- All query execution happens client-side
- No data is sent to external servers (except for demo data loading)
- User data stays in the browser's memory and localStorage

### Third-Party Dependencies

We regularly monitor and update dependencies for security vulnerabilities:

- Automated dependency updates via Dependabot
- Regular security audits with `npm audit`
- Review of dependency changes before merging

### Content Security

- DuckDB WASM provides sandboxed SQL execution
- File uploads are processed client-side
- No server-side code execution

## Security Disclosure Process

1. **Report received** - Acknowledgment sent within 48 hours
2. **Validation** - We validate and assess the severity
3. **Fix development** - We develop and test a fix
4. **Disclosure** - Coordinated public disclosure after fix is ready
5. **Credit** - Reporter is credited in security advisory (if desired)

## Hall of Fame

We maintain a list of security researchers who have responsibly disclosed vulnerabilities:

<!-- Security researchers will be listed here -->

Thank you for helping keep SQLio secure! 🔒
