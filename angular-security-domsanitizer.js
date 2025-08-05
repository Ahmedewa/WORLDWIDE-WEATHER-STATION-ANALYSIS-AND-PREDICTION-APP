   ANGULAR[FRONTEND]-BUILT-IN-SECURITY



## 1. Angular’s Built-In Security (XSS Protection)

### How It Works  
Angular automatically sanitizes untrusted values in templates (interpolation, property bindings, etc.) to prevent XSS. For deliberate HTML insertion, you use the `DomSanitizer`.

### Code  
```ts
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-safe-content',
  template: `<div [innerHtml]="trustedHtml"></div>`
})
export class SafeContentComponent {
  trustedHtml: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    const raw = '<img src=x onerror=alert("XSS") />';
    // Bypass only when you absolutely trust the source
    this.trustedHtml = this.sanitizer.bypassSecurityTrustHtml(raw);
  }
}
```

### Resources  
- Angular Security Guide: https://angular.io/guide/security  
- OWASP XSS Prevention Cheat Sheet: https://owasp.org/www-project-cheat-sheets/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html  

### Best Practices  
- Rely on Angular’s default sanitization; avoid `bypassSecurityTrust…` unless necessary.  
- Never bind user-supplied HTML without sanitizing.  

---

